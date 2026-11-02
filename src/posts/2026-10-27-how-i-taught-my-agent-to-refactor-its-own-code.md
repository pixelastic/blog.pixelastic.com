---
title: "How I taught my agent to refactor its own code"
date: 2026-10-27
description: "Reduce, rewrite, restructure: three ordered passes that keep my agent from mixing every kind of refactoring at once."
tags:
  - claude-code
  - ai
  - refactoring
---

Most of my code is now written by my agents, one issue at a time. Each issue is
carefully planned, tested, linted, reviewed and commited. I'm happy with the
code quality of each issue taken invidually, but if I string all the issues
together, I still sometimes end up with some code duplication and useless
indirection.

I also tend to review the whole plan implementation at the end, rather than
after each issue. This gives me the big picture and is where I do the heaviest
refactorings.

## I mix everything

But even before agents were a thing, my approach to refactoring was very
organic. I know the theory about don't refactoring everything at once. Starting
small. Committing often. Not changing implementation and tests at the same time.

But in practice, it's very hard for me to not fix something I saw as obviously
wrong. It's very hard to only fix the small typo when there was a blatant code
duplication next to it. I end up removing old code, updating documentation,
changing function signatures and renaming variables all in the same pass.

Agents, on the other hand are pretty good at following a clear set of steps. So
maybe I could teach my agent the rigorous refactoring hygiene I never managed to
teach myself. That's why one day I started writing down, as a `skill`, what good
refactoring looks like to me.

I split it in three layers: reduce, rewrite and restructure. You start small,
and increase complexity and impact as you proceed. Each pass is meant to make
the next pass easier.

## The example

Let's use an example to better understand what I mean.

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

The goal of the first pass is to reduce the size of the code by removing all the
noise. Commented code, unused imports or orphaned functions are dead code that
have no impact on the behavior and only makes understanding the code harder.

It was true for humans, it's still true for agents. If you don't need it, remove
it. Less code means less bugs.

```js
import fs from 'node:fs'; // [!code --]
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

function legacyFormat(order) { // [!code --:3]
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
  // console.log('order', order); // [!code --]
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

In this phase, I also rewrite variables so their name removes any ambiguity as
to what they represent: I use full names rather than abbreviations and avoid
generic names like `data`.

Once again, behavior is exactly the same, this is purely cosmetic but helps
understanding what objects and concepts we're dealing with.

```js
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

function buildSummary(order, [-name-]{+customerName+}) {
  return {
    id: order.id,
    customer: [-name-]{+customerName+},
    price: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}

export async function getOrderSummary(orderId) {
  const order = await fetchOrder(orderId);
  const [-cust-]{+customer+} = await fetchCustomer(order.customerId);
  let [-name-]{+customerName+};
  if ([-cust-]{+customer+}) {
    if ([-cust-]{+customer+}.name) {
      [-name-]{+customerName+} = [-cust-]{+customer+}.name;
    } else {
      [-name-]{+customerName+} = [-cust-]{+customer+}.email;
    }
  } else {
    [-name-]{+customerName+} = 'Unknown';
  }
  const [-data-]{+summary+} = buildSummary(order, [-name-]{+customerName+});
  return [-data-]{+summary+};
}

export async function getInvoiceSummary(orderId) {
  const order = await fetchOrder(orderId);
  const [-cust-]{+customer+} = await fetchCustomer(order.customerId);
  let [-name-]{+customerName+} = 'Unknown';
  if ([-cust-]{+customer+}) [-name-]{+customerName+} = [-cust-]{+customer+}.name || [-cust-]{+customer+}.email;
  return buildSummary(order, [-name-]{+customerName+});
}
```

Now that the code is clean, we'll move to the nest phase: rewrite.

## Rewrite

In this second pass, the goal is to improve each function locally, without (yet)
thinking about how all those functions interact with each other globally.

A good example is replacing deeply nested `if`s with some early return, or
ensuring similar looking functions are coded in a similar fashion. When you have
several ways to skin a cat, make sure you at least skin the cat consistenly the
same way throught your code.

```js
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

function buildSummary(order, customerName) {
  return {
    id: order.id,
    customer: customerName,
    price: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}

export async function getOrderSummary(orderId) {
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  let customerName; // [!code --:12]
  if (customer) {
    if (customer.name) {
      customerName = customer.name;
    } else {
      customerName = customer.email;
    }
  } else {
    customerName = 'Unknown';
  }
  const summary = buildSummary(order, customerName);
  return summary;
  if (!customer) return buildSummary(order, 'Unknown'); // [!code ++]
  return buildSummary(order, customer.name || customer.email); // [!code ++]
}

export async function getInvoiceSummary(orderId) {
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  let customerName = 'Unknown'; // [!code --:3]
  if (customer) customerName = customer.name || customer.email;
  return buildSummary(order, customerName);
  if (!customer) return buildSummary(order, 'Unknown'); // [!code ++]
  return buildSummary(order, customer.name || customer.email); // [!code ++]
}
```

In that phase, you never change the tests, you only improve the code. Tests are
your safeguard that your changes make the code better, without changing the
behavior.

In my example here, we can see that once we've changed the deeply nested `if`s
into a simpler return early clause, the shape of both `getOrderSummary` and
`getInvoiceSummary` is very similar.

We might have a way to refactor that further, but this will come in the final
phase: restructure.

## Restructure

Now that we cleanup up the **inside** of each function, now comes the time to
cleanup how those functions interact with each other.

Both `getOrderSummary` and `getInvoiceSummary` do exactly the same thing, so I
removed them and kept only a higher level `getSummary` function. The
`buildSummary` function is no longer shared between two functions, so it can now
be inlined in `getSummary`.

In that phase, we are allowed to update tests. As we are changing the interface
of the code, we must also update the relevant tests accordingly. In our example
it would mean moving the `buildSummary` tests into the `getSummary` tests.

```js
import { formatDate } from './dates.js';
import { fetchOrder, fetchCustomer } from './api.js';

function buildSummary(order, customerName) { // [!code --:8]
  return {
    id: order.id,
    customer: customerName,
    price: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}

export async function getOrderSummary(orderId) { // [!code --:6]
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  if (!customer) return buildSummary(order, 'Unknown');
  return buildSummary(order, customer.name || customer.email);
}

export async function getInvoiceSummary(orderId) { // [!code --:6]
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  if (!customer) return buildSummary(order, 'Unknown');
  return buildSummary(order, customer.name || customer.email);
}

export async function getSummary(orderId) { // [!code ++:10]
  const order = await fetchOrder(orderId);
  const customer = await fetchCustomer(order.customerId);
  return {
    id: order.id,
    customer: customer ? customer.name || customer.email : 'Unknown',
    price: order.totalWithTax,
    date: formatDate(order.createdAt),
  };
}
```

This is also where you could remove useless intermediate wrappers, or even
change the input signature or output format of your functions. This means
updating the callers and the tests, so this makes this phase the riskiest.

That is why it comes last; with the code cleaned up and simplified in the
previous phase, heavy refactoring in that phase is now possible.

## The skill

I packaged all this in a [`/refactor` skill][skill] that I run regularly when I
feel I've hit a big enough chunk of code.

Feel free to use my skill as an inspiration to build yours; mine contains a few
assumptions about how I plan and execute my issues.

[skill]:
  https://github.com/pixelastic/oroshi/tree/main/tools/ai/claude/config/skills/refactor
