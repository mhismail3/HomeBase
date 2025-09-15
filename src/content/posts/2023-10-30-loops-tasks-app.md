---
title: Loops — A Tasks App Prototype
date: 2023-10-30
summary: A prototype task manager for iOS built with SwiftUI.
tags: [portfolio, ios, swiftui]
hero: /portfolio/loops/TasksAppHeader.png
draft: false
---

One of my goals for 2023 was to learn a little more about app development. I decided to start learning SwiftUI, and began by creating mocks of a task management app in Figma, calling it Loops. Figma allows me to pull in elements from Apple’s Design Library and use actual iOS elements as a guiding point for my designs. You can check out some of my design work [here](https://www.figma.com/file/qb3i6FxWQej7b8aC4lMtl1/Tasks-App?type=design&node-id=0-1&mode=design).

When starting to code the initial app views and workflows, I learned common SwiftUI design patterns and constructed a robust‑yet‑intuitive layout using Views and ViewComponents. I wanted the app to feel simple and easy to use, without too much of a learning curve. Most of all, I wanted it to be a smooth and buttery experience, with a minimalist design and bold colors to visually anchor the user.

I took care in adding smooth, delightful animations throughout the prototype, especially in the bottom Nav Bar. I built a reusable Nav Bar prototype with five buttons and a color‑shifting highlight that indicates the selected tab.

The back end used Google Firebase/Firestore which pushed changes to the front end in real time, enabling a seamless data storage experience for users without manual saves.

This was an incredibly enjoyable project: using Xcode and SwiftUI to rapidly design and iterate on mobile UI/UX, deploy to my devices for real‑world testing, and get fast feedback. One day, I hope to return and flesh it out further (maybe even ship it to the App Store!).

![Loops header](/portfolio/loops/TasksAppHeader.png)

![Login flow animation](/portfolio/loops/TasksLoginPage.gif)

![Nav bar animation](/portfolio/loops/TasksNavBar.gif)

