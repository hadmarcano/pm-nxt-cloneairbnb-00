# Atomic Design Methodology with React and TypeScript


### Problems we have faced in most past projects, such as
1. Understanding of component state
2. Difficult code maintainability due to lack of standardization
3. Repeated code
4. Side effects
5. Amount of setup time for developers
6. Very specific components to each pages

## Atomic Design

> We’re not designing pages, we’re designing systems of components.—Stephen Hay

Atomic Design is all about creating and maintaining robust design systems, allowing you to roll out higher quality, more consistent UIs faster than ever before. This artical introduces a methodology for thinking of our UIs as thoughtful hierarchies, discusses the qualities of effective pattern libraries, and showcases techniques to transform your team's design and development workflow.

Atomic Design is a methodology used to create web designs. This principle is based on the concept of first creating elements and then putting them together to make sense for the user. This way of building a website from the ground up has many advantages compared to other ways of constructing websites. At Open Social we try to break down designs into the smallest (logical) re-usable parts. Re-usable also means consistent. The basic idea is that a website is build from scratch without designing all the pages separately. There are a few steps that needs to be taken when using this method.

### Why use
In projects where there are a hundred or two hundred components, it is not easy to remember everything. The need for some kind of a design system appears when we start to get overwhelmed by the count of components on a project.

<!-- You first consider what you need to build your interface. From there, you start by creating the smallest meaningful items, atoms. When all of the atoms are built, you turn your attention to the slightly bigger meaningful items until you have a molecule. Once you’ve combined several molecules, you’ll be able to create a more complex structure, an organism.
 -->
 
## Methodology
###  - Atomic
The first step is building atoms. Atoms are buttons, labels, inputs, etc. They are all small items that are used widely across a website. Starting with this step allows a designer to create a library with a lot of elements that can be re-used without creating them over and over again.
![alt text](https://www.getopensocial.com/wp-content/uploads/2017/01/Atomic-Design-Blog-visuals_Atoms.png)

###  - Molecules
“Molecules are a group of atoms that are put together”. As an example you can see how we build up an activity stream item. Think of a title, read more button, visibility status, comments icon, etc in one card. With this step we’re aiming to generate components that can be reused on other places as well such as news teasers, topic teasers, etc.
![alt text](https://www.getopensocial.com/wp-content/uploads/2017/01/Atomic-Design-Blog-visuals_Molecules.png)

###  - Organisms
For example an Activity Stream item on Open Social is a group of individual items that are put together to make sense. You can see a username, a thumbnail image, title, comments, etc.. Our front-end team can put an “organism” directly into a layout. It is not dependent on other molecules or organisms.
![alt text](https://www.getopensocial.com/wp-content/uploads/2017/01/Atomic-Design-Blog-visuals_Organisms.png)

###  - Templates
With this step we’re leaving the biochemistry analogy. At this stage in the process we’re creating visuals that actually makes sense for in our product. For this example we have put all the details in place. The username, profile image, title, etc. At this stage we’re not creating fully designed pages.

For example there can be a node template that will be used for an event and will be used for a topic. The structure is the same, header, hero, detail, sidebar, footer. A template can include multiple organisms this way.
![alt text](https://www.getopensocial.com/wp-content/uploads/2017/01/Atomic-Design-Blog-visuals_Templates.png)

###  - Pages
These are the actual pages that we have been designing since the beginning of webdesign. In the case of our activity stream cards we will create a page with a menu, activity stream, footer, etc.. At this stage the whole context is clear.  These are the pages that will be exported and send out to the product owner for review. With Open Social the role of the product owner is to have a vision of what he wishes to be build, and communicate this to the team. The way we are doing this is to work with a backlog filled with user stories.

---
### Why TypeScript + Atomic Design?

Atomic design ensure developers are all on the same page, to atomic levels.

Typescript ensures developers are all on the the same page, to an even deeper level - everything needs to be defined and expected.

You can define what comes in and out of you components and be strict making your atoms, molecules and organisms even more robust.

## Typescript

### Javascript => Dynamic typing.
Programs written in javascript do not know the data type of a variable until that variable is assigned a value at runtime.

### Typescript => Static typing.
Check types at compile time and throw an error if the variable is ever given a value of a different type. **Intellisense which saved the day more time than I can count.**


## Advantages

<!-- ### - Reusability
For every element created inside our Sketch app we have the ability to reuse and modify it exactly the way we like it. This method is time efficient and forces the designer to think about the style itself rather than redesigning a lot of elements. Another advantage is that we can easily share our designs within the team so every designer can collaborate on the project. -->

### - Easy updates
When we have designed a project using Atomic Design it’s fairly easy to keep the project up to date. Since there is a lot going on in terms of improving the platform we can update every atom the way we want. It automatically changes everywhere  in the project. This allows us to show the team what effect specific changes in the design will have on the project and it allows us to quickly show the product and process feedback without having to change it everywhere.

<!-- 
### - Less components
If there is a clear list with requirements it’s easier to reuse these atoms, molecules, organisms than ever before. A designer will most likely create new components with slight variations. This way keeping the design as consistent as possible. -->

### - You can mix and match components
By breaking down components into basic atoms it's easy to see what parts of the site can be reused, and how they can be mixed and matched to form other molecules and even organisms. 

### - Creating a style guide is simple
If a site is created according to Atomic Design principles from the start, all the atoms and molecules that are created before the site is built can serve as a basic style guide. Even for sites that haven't been built atomically, it isn't difficult to extrapolate the basic components and put them together to construct more pages. Bear in mind, though, it is always best to create a site atomically from the beginning, rather than trying to introduce Atomic Design principles to a site later on.

### - Easy to understand layout
The code of an atomically designed website is typically much easier to read than one created a more traditional way. This is true not only during the time of creation, but in the future when a site is being looked back on for reference or small tweaks. 

### - Code is more consistent
With Atomic Design, you use predefined atoms to create the site layout, it is easy to see which components are being used for different parts of the site. This reduces the chances of writing duplicate code.

For example, if someone creates a site without using Atomic Design and they require, say, a red button, they would have to look through the whole site to try and find an existing one. If this did exist, they would need to copy and paste that code to the new instance. If there were no red buttons, they'd need to create a new one. With Atomic Design however, it is easy to go back through the list of atoms and find that exact red button.

<!-- ### - No focus on pixel-perfect designs
As the idea behind Atomic Design is to use atoms as the building blocks for site creation, it is less likely that a web developer will create many atoms for a similar thing. Instead, they can simply look through the list of existing atoms, and tweak them to create new atoms if required.

A great example of this would be for titles on a site. Let's say a creator has a list of titles used for the site, all in black: a main header, sub-header and paragraph title. They haven't worked in the site in a while and need to come back to the site to add a new blue title. They could take a look at the titles that already exist and customise one of them to get the result they desire. -->

<!-- 
### - Quicker prototyping
Having a list of atoms before site creation begins means you can mock up pages quickly and easily – all that is required is to pick and combine the required elements for the page. The mockup can then be customised and refined for the final site. -->

<!-- ### - Easier to update and remove parts of the site
As only one atom, molecule or organism is being changed at any one time, it is easy to ensure that any updates to a component are carried across to all other instances across the site. Similarly, unwanted components can easily be removed. -->

### - More modular file structure
Although Atomic Design is very common when it comes to markup (HTML), I believe these techniques can also be used for CSS, JavaScript, or any other languages used to create a site to make overall code more modular and reusable.

## Summary
So it’s important to keep in mind that at the start, the atomic design approach will require plenty of extra effort to implement, yet it will all pay off in the long run! You don’t just create a bunch of buttons and pages. You create a system. It will therefore allow you to have a system that is fully documented and can be scaled for dozens of your client’s projects (think of all the time & money you’d save on). So now that you know the benefits of integrating an atomic design system into the workflow processes.

- Atoms:        Building blocks of the project, they can’t be broken down
- Molecules:    A group of atoms are grouped together that become new properties
- Organisms:    Group of molecules joined together to form a part of the interface
- Templates:    Mostly focused on content structure
- Pages:        Specific instances of templates