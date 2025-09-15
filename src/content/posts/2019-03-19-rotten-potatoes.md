---
title: Rotten Potatoes — Academic Project
date: 2019-03-19
summary: A simple movie recommender using keyword and ratings similarity.
tags: [portfolio, python, ml]
hero: /portfolio/rotten-potatoes/rottenpotatoes-header.png
dateRange: 01/02/2019 – 03/19/2019
hours: ~35–40 hrs
tech: [Python, HTML, CSS]
order: 2
draft: false
---

For this academic project, my classmate and I created a small movie recommender system. A user enters a movie title and the system returns five related movies using one of two strategies: keyword similarity or ratings similarity (k‑nearest‑neighbors over user ratings).

<figure class="pin full">
  <img src="/portfolio/rotten-potatoes/rottenpotatoes-header.png" alt="Rotten Potatoes header" loading="lazy" decoding="async" />
  <figcaption>Exploring recommendations by keywords or by ratings similarity.</figcaption>
  
</figure>

The goal was to implement basic data‑mining and ML concepts end‑to‑end in a usable app, not to chase state‑of‑the‑art metrics. It works and is a solid baseline we could iterate on further.

You can view the final project report <a href="/portfolio/rotten-potatoes/RottenPotatoes_Report.pdf" target="_blank" rel="noopener">here</a>.

<figure class="pin pin-right">
  <img src="/portfolio/rotten-potatoes/rottenpotatoes-results.png" alt="Search results page screenshot" loading="lazy" decoding="async" />
</figure>

Future directions we discussed included better text features (e.g., TF‑IDF with bigrams), normalizing ratings by user, and trying a light matrix factorization for collaborative filtering.
