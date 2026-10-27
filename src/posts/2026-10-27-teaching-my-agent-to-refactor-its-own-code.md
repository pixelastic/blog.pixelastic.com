---
title: "How I teach my agent to refactor its own code"
date: 2026-10-27
description: "Reduce, rewrite, restructure: three ordered passes that keep my agent from mixing every kind of refactoring at once."
tags:
  - claude-code
  - ai
  - refactoring
---

Most of my code is now written by agents, one issue at a time. Each issue is
clean on its own. Put them all together and my code ends up with duplication,
useless indirection and a few things that made sense three issues ago.

So I end up asking for a refactoring pass often. And every time, I had to
explain again how I wanted it done.

## I mix everything

I know the theory of refactoring. In practice, when I do it by hand, it all
blends together. I fix a typo, delete some commented code, notice that two
output formats don't match, rename a variable, and reshape a function. All in
the same pass.

I can't filter that. I don't know what to fix first, and I lose track of what I
already touched.

An agent is good at following steps, so I tried to teach it three. I call them
reduce, rewrite, and restructure. They go from the most trivial change to the
most fundamental one, and each pass makes the next one easier.

## The example

Here is a made-up file. It is small, but it has most of what I find in real
code.

```js
import fs from 'node:fs';
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

function legacyFormat(order) {
  return order.id + ':' + order.total;
}

function buildSummary(order, name) {
  return {
    id: order.id,
    customer: name,
    price: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}

export async function getOrderSummary(orderId) {
  const order = await fetchOrder(orderId);
  const cust = await fetchCustomer(order.customerId);
  // console.log('order', order);
  let name;
  if (cust) {
    if (cust.name) {
      name = cust.name;
    } else {
      name = cust.email;
    }
  } else {
    name = 'Unknown';
  }
  const data = buildSummary(order, name);
  return data;
}

export async function getInvoiceSummary(orderId) {
  const order = await fetchOrder(orderId);
  const cust = await fetchCustomer(order.customerId);
  let name = 'Unknown';
  if (cust) name = cust.name || cust.email;
  return buildSummary(order, name);
}
```

## Reduce

The first pass doesn't read the logic. It removes what has no reason to be
there, and it fixes names.

Here that means dropping the unused `fs` import, the `legacyFormat` function
that nobody calls, and the commented `console.log`. Then `cust` becomes
`customer`, `name` becomes `customerName`, and `data` becomes `summary`.

Nothing changes in the behavior. The file is shorter, and easier to read for a
human. And it is easier for the next pass, because there is less to think about.

## Rewrite

The second pass works inside the functions. The nested `if` in `getOrderSummary`
can use early returns. And `getInvoiceSummary` does the same thing in a
different style, so I normalize both.

```js
export async function getOrderSummary(orderId) {
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  if (!customer) return buildSummary(order, 'Unknown');
  return buildSummary(order, customer.name || customer.email);
}

export async function getInvoiceSummary(orderId) {
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  if (!customer) return buildSummary(order, 'Unknown');
  return buildSummary(order, customer.name || customer.email);
}
```

The tests don't change. If one of them fails, I did something wrong. That is the
whole point of this pass: it proves each function is now simpler, without
touching what it does.

And now the problem is visible: both functions are identical. I couldn't see it
before: dead code and two different styles hid it.

## Restructure

The last pass changes the boundaries between functions. This is where I allow
myself to question the architecture.

`getInvoiceSummary` is now a copy of `getOrderSummary`, so it goes away.
`buildSummary` has one caller left, so it goes away too. And there is the
`price` key, which holds the total with tax. I would call it `totalWithTax`.

```js
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

export async function getOrderSummary(orderId) {
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  return {
    id: order.id,
    customer: customer ? customer.name || customer.email : 'Unknown',
    totalWithTax: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}
```

That last change breaks the external API. And the tests of `getInvoiceSummary`
now test a function that doesn't exist. So tests break, and I let the agent
delete the ones that tested a layer I removed.

It is also the riskiest pass. That is why it comes last: I read the summary of
the deleted tests and decide if they were really useless. I would not question
an API that early, in a file full of dead code and unclear names. After the
first two passes, I can.

## The skill

I packaged all this in a [`/refactor` skill][skill]. Take it as inspiration, not
as something you can drop in: it assumes how I write my issues and my plans.

[skill]:
  https://github.com/pixelastic/oroshi/tree/main/tools/ai/claude/config/skills/refactor
