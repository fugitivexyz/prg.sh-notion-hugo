---
title: "4 Surprising Lessons from a 100- Line LLM Framework"
date: "2026-01-04T13:49:00.000Z"
lastmod: "2026-01-04T22:13:00.000Z"
draft: false
featureimage: "https://www.notion.so/images/page-cover/woodcuts_1.jpg"
series: []
authors:
  - "Pragnesh Gajjar"
custom-front-matter: "hello"
tags:
  - "LLM"
  - "Agents"
  - "AI"
categories: []
NOTION_METADATA:
  object: "page"
  id: "2dee1f04-2488-81ce-b511-d9b90c53bddd"
  created_time: "2026-01-04T13:49:00.000Z"
  last_edited_time: "2026-01-04T22:13:00.000Z"
  created_by:
    object: "user"
    id: "65433cf3-8806-4489-8d3a-04127698c103"
  last_edited_by:
    object: "user"
    id: "65433cf3-8806-4489-8d3a-04127698c103"
  cover:
    type: "external"
    external:
      url: "https://www.notion.so/images/page-cover/woodcuts_1.jpg"
  icon: null
  parent:
    type: "data_source_id"
    data_source_id: "2dee1f04-2488-81e4-b451-000bd57df8f3"
    database_id: "2dee1f04-2488-81b2-a10c-eca6f47e99e5"
  archived: false
  in_trash: false
  is_locked: false
  properties:
    series:
      id: "B%3C%3FS"
      type: "multi_select"
      multi_select: []
    draft:
      id: "JiWU"
      type: "checkbox"
      checkbox: false
    authors:
      id: "bK%3B%5B"
      type: "people"
      people:
        - object: "user"
          id: "65433cf3-8806-4489-8d3a-04127698c103"
          name: "Pragnesh Gajjar"
          avatar_url: "https://s3-us-west-2.amazonaws.com/public.notion-static.com/591d0a\
            82-bd05-4803-a9f7-b6a3e41a30cb/my-notion-face-transparent.png"
          type: "person"
          person:
            email: "pragnesh.gajjar@icloud.com"
    custom-front-matter:
      id: "c~kA"
      type: "rich_text"
      rich_text:
        - type: "text"
          text:
            content: "hello"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "hello"
          href: null
    tags:
      id: "jw%7CC"
      type: "multi_select"
      multi_select:
        - id: "08c57578-2158-4e7b-a0d3-ea36a732ea86"
          name: "LLM"
          color: "red"
        - id: "35b68339-24d9-4c1d-a297-69646b317ead"
          name: "Agents"
          color: "brown"
        - id: "de1d14ca-bfe6-409f-9a2d-bd30971d1d8e"
          name: "AI"
          color: "purple"
    categories:
      id: "nbY%3F"
      type: "multi_select"
      multi_select: []
    Last edited time:
      id: "vbGE"
      type: "last_edited_time"
      last_edited_time: "2026-01-04T22:13:00.000Z"
    summary:
      id: "x%3AlD"
      type: "rich_text"
      rich_text: []
    Name:
      id: "title"
      type: "title"
      title:
        - type: "text"
          text:
            content: "4 Surprising Lessons from a 100- Line LLM Framework"
            link: null
          annotations:
            bold: false
            italic: false
            strikethrough: false
            underline: false
            code: false
            color: "default"
          plain_text: "4 Surprising Lessons from a 100- Line LLM Framework"
          href: null
  url: "https://www.notion.so/4-Surprising-Lessons-from-a-100-Line-LLM-Framework-\
    2dee1f04248881ceb511d9b90c53bddd"
  public_url: "https://watery-sapphire-0d4.notion.site/4-Surprising-Lessons-from-\
    a-100-Line-LLM-Framework-2dee1f04248881ceb511d9b90c53bddd"
MANAGED_BY_NOTION_HUGO: true

---


If you've spent any time building with large AI frameworks, you've likely felt the pain. You start with a simple goal but quickly find yourself wrestling with bloated abstractions, mysterious dependency conflicts, and rapidly changing interfaces that leave documentation in the dust. You're not alone.


"LangChain was helpful at first when our simple requirements aligned with its usage presumptions. But its high-level abstractions soon made our code more difficult to understand and frustrating to maintain."


This sentiment captures a growing frustration in the AI development community. In response, a radical alternative called Pocket Flow serves as a provocation—a manifesto against industry bloat that strips away everything unnecessary, boiling an entire LLM framework down to just 100 lines of code. Exploring this project reveals several powerful, counter-intuitive ideas about building the next generation of AI systems.


### 1. Your Framework Doesn't Need to Be 100,000 Lines Long


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-802c-a83a-df4e397544f0)


**The core philosophy of Pocket Flow is that complex LLM systems are fundamentally just "simple directed graphs."** Instead of building layer upon layer of abstraction, the framework provides three simple, powerful building blocks, much like a well-organized kitchen:


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-805e-bf9f-e2f4323bfb89)

- **Nodes:** These are the individual work stations where a specific task happens, like chopping vegetables or cooking a dish. Each node has three operations: `prep` (gather ingredients), `exec` (perform the task), and `post` (serve the dish and **decide what to make next**). Crucially, the `post` method returns an "action" string—like `"search"` or `"answer"`—that determines the next step, enabling dynamic, agent-like decision-making.
- **Flow:** This is the recipe that directs the entire process. It reads the action from the previous Node and dictates which station to visit next. For example, "If the `DecideAction` node returns 'search', proceed to the `SearchWeb`station."
- **Shared Store:** This is the central countertop where all ingredients and completed dishes are placed, visible and accessible to all stations. For simple systems, it’s just an in-memory dictionary. For more complex systems or when persistence is required, it can be a database.

That’s it. With zero dependencies and zero vendor lock-in, this minimalist approach provides the foundation for building everything from complex RAG systems to sophisticated multi-agent workflows, proving that you don't need a massive framework to build powerful applications.


### 2. Ditching API Wrappers is a Superpower, Not a Weakness


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-8033-9656-eb2c2d22572b)


**In a counter-intuitive move, Pocket Flow deliberately avoids bundling vendor-specific APIs like OpenAI or Gemini wrappers.** While other frameworks see this as a core feature, Pocket Flow argues it introduces more problems than it solves. This is like choosing a versatile chef's knife over a drawer full of single-purpose gadgets like an avocado slicer. The reasoning comes down to three key points:

- **API Volatility:** Vendor APIs and their official libraries change frequently, introducing bugs and dependency issues. As the creator noted after seeing constant complaints about existing tools, hardcoding these into a framework creates a "pain to maintain" that a minimal approach completely sidesteps.
- **Flexibility:** By avoiding built-in wrappers, developers are freed from vendor lock-in. You can easily switch to the latest open-source models, use a fine-tuned endpoint, or run a model locally without fighting the framework's architecture.
- **Full Control:** When you own the API call, you have complete control. Implementing custom logic for critical features like prompt caching, request batching, or response streaming becomes straightforward instead of a battle against pre-baked, rigid abstractions.

![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-8009-b382-ca3c56fc5560)


### 3. Stop Wrapping APIs, Start Instructing Agents


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-80a0-a8d4-c3eed2d07ab6)


**The true vision behind Pocket Flow's minimalist design is to enable "Agentic Coding"—a new paradigm of human-AI collaboration.** Forget the hype about no-code platforms replacing developers. The future is about humans and AI working together, each playing to their strengths.


This paradigm is best understood with an analogy: building a house.


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-802d-9129-ecd83d0dae55)


The key mechanism making this possible is **"Documentation as the second codebase."** This is where the minimalist design shines. The simplicity of the `Node/Flow/Shared Store` model is precisely what makes it legible to an AI agent. A complex, 100,000-line framework is a black box, but a system built on these simple, documented primitives becomes an instruction manual for an AI partner.


The practical implementation of this is a design document, often `docs/design.md`, where the human architect lays out the blueprint. This document is the "master recipe" that an AI "sous-chef" can read and execute, generating perfectly customized solutions on the fly.


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-8046-9bef-e1097d4929a1)


### 4. Your Most Valuable Skill is No Longer Coding —> It's Thinking


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-8056-871d-f022eb09e4fa)


**The final, and perhaps most important, lesson from Pocket Flow is a grounding principle against the hype of AI replacing developers.** The "Agentic Coding" methodology doesn't diminish the human's role; it elevates it. By offloading tedious implementation to AI agents, the developer's primary responsibility shifts to where it matters most: system design.


The initial, high-level design must be solid before any automation can begin. You must thoroughly understand the problem and the desired workflow before an AI partner can help build it. This principle is captured perfectly in the project's documentation:


If Humans can’t specify the flow, AI Agents can’t automate it!


This underscores a fundamental truth about the future of software development. The developer's primary job is evolving from writing boilerplate code to deep problem understanding and high-level architectural design.


### Conclusion: Simplicity is the Ultimate Sophistication


Pocket Flow's 100-line experiment is more than an exercise in minimalism. It’s a challenge to how we think about building software. By stripping away complexity, we don't just get smaller codebases; we unlock a fundamental shift in the developer's role from a low-level builder to a high-level architect of intelligent systems.


![](https://prg-sh-notion-hugo.pages.dev//api?block_id=2dee1f04-2488-8054-a32a-e21e75a41bf8)


It leaves us with a forward-looking question. Instead of asking what new features a framework can give us, maybe the real question is: what can we strip away to make it simple enough for our AI partners to build _with_ us?


---

