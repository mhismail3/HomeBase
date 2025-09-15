---
title: Space Invaders — Academic Project
date: 2018-03-18
summary: A faithful Space Invaders clone with design patterns over an Azul-based framework.
tags: [portfolio, csharp, cpp]
hero: /portfolio/space-invaders/spaceinvaders-gameplay.png
dateRange: 01/02/2018 – 03/18/2018
hours: ~45–50 hrs
tech: [C#, C++]
draft: false
---

The goal of this project was to recreate the original Space Invaders arcade game as faithfully as possible, while making use of design patterns to write more efficient code. The Space Invaders game consists of a 5 × 11 grid of aliens that animate and move left and right on the screen, moving down slightly and reversing direction when hitting the left or right edge. A player ship at the bottom of the screen can move left and right, and shoot missiles to try and destroy the aliens one by one. The player has three lives to get the highest score possible.

<figure class="pin full">
  <img src="/portfolio/space-invaders/spaceinvaders-gameplay.png" alt="Space Invaders gameplay" loading="lazy" decoding="async" />
</figure>

The game was designed on top of Azul, an existing graphics and rendering framework provided by the faculty at DePaul University. The game itself was written mostly from scratch so that it might resemble the original Space Invaders game as similarly as possible.

<figure class="pin pin-left">
  <img src="/portfolio/space-invaders/spaceinvaders-loadscreen.png" alt="Load screen" loading="lazy" decoding="async" />
</figure>

I used a number of common design patterns to keep complexity in check (factories, observers, command objects, etc.). A brief design document is available <a href="/portfolio/space-invaders/SpaceInvaders_DesignDocument.pdf" target="_blank" rel="noopener">here</a>.

<figure class="pin pin-right">
  <img src="/portfolio/space-invaders/spaceinvaders-gameplay.png" alt="Gameplay screenshot" loading="lazy" decoding="async" />
</figure>

This is one of the larger projects that I have worked on so far, and was the most illuminating in terms of what the development process can actually look like. This project consisted of writing over 100 classes and 15 design patterns that all interacted in various, complex ways that had to be diligently handled. Additionally, having no previous experience with the provided Azul framework gave me a peek at what it's like to take existing source code that is pre‑written and integrate it into a project of your own.

Because this was an in‑class project, I cannot make my own source code available for viewing online. However, if asked about this project, I would be happy to describe my development process and the things I've learned along the way.
