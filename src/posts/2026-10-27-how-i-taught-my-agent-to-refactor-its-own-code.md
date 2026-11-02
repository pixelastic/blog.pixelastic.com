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
carefully planned, tested, linted, reviewed and committed. I'm happy with the
code quality of each issue taken individually, but if I string all the issues
together, I still sometimes end up with some code duplication and useless
indirection.

I also tend to review the whole plan implementation at the end, rather than
after each issue. This gives me the big picture and is where I do the heaviest
refactorings.

## I mix everything

But even before agents were a thing, my approach to refactoring was very
organic. I know the theory about not refactoring everything at once. Starting
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
and increase complexity and impact as I proceed. Each pass is meant to make the
next pass easier.

## The example

Here is an example to show what I mean.

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
has no impact on the behavior and only makes understanding the code harder.

It has always been true for humans, and it's still true for agents. If I don't
need it, I remove it. Less code means less bugs.

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

Now that the noise is gone, I move to the next phase: rewrite.

## Rewrite

In this second pass, I improve each function locally, without (yet) thinking
about how all the functions interact with each other globally.

I start by renaming variables so their name removes any ambiguity as to what
they represent: I use full names rather than abbreviations and avoid generic
names like `data`.

The behavior is exactly the same. This is purely cosmetic, but it helps me
understand what objects and concepts I'm dealing with.

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

Another example is replacing deeply nested `if`s with some early return, or
ensuring similar looking functions are coded in a similar fashion. When there
are several ways to skin a cat, I make sure I at least skin the cat consistently
the same way throughout my code.

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

In that phase, I never change the tests, I only improve the code. Tests are my
safeguard that my changes make the code better, without changing the behavior.

In my example here, once I've changed the deeply nested `if`s into simpler early
returns, the shape of both `getOrderSummary` and `getInvoiceSummary` is very
similar.

I might have a way to refactor that further, but this comes in the final phase:
restructure.

## Restructure

Now that I've cleaned up the **inside** of each function, it is time to clean up
how those functions interact with each other.

Both `getOrderSummary` and `getInvoiceSummary` do exactly the same thing, so I
remove them and keep only a higher level `getSummary` function. The
`buildSummary` function is no longer shared between two functions, so I inline
it in `getSummary`.

In that phase, I am allowed to update tests. As I am changing the interface of
the code, I must also update the relevant tests accordingly. In my example, that
means moving the `buildSummary` tests into the `getSummary` tests.

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

This is also where I can remove useless intermediate wrappers, or even change
the input signature or output format of my functions. This means updating the
callers and the tests, which makes this phase the riskiest.

That is why it comes last: with the code cleaned up and simplified by the
previous phases, heavy refactoring is now possible.

## The skill

I packaged all this in a [`/refactor` skill][skill] that I run regularly when I
feel I've hit a big enough chunk of code.

Feel free to use my skill as an inspiration to build yours; mine contains a few
assumptions about how I plan and execute my issues.

[skill]:
  https://github.com/pixelastic/oroshi/tree/main/tools/ai/claude/config/skills/refactor
