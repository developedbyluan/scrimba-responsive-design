# NFTs

## Units

### Absolute unit:

-   the same size no matter what size of the screen you view.

### Relative units:

-   Relative to another value (font-size, parent size)
-   Dynamic flexibility
-   Resize & scale

#### Percentage: (for width) relative to the width of the parent element

1.
-   commit: `0e1e4cd``
-   When building responsive layouts, use percentage-based widths to make elements adapt relative to their parent
    containers.
-   In this commit, the .container takes up 90% of the header's width, while the header itself spans 100% of the
    viewport width.

2. Fix the images
- `commit: 598c001`
- When I change their width to 100% of the container width, they look distorted and still overflow. Why is this happening?
- Becausee their parent is a flex container `section-two-image-container`.
- When multiple flex items within a container each try to claim 100% width, they create a natural overflow situation. This happens because the parent flex container can't accommodate both items at full width simultaneously, leading to unexpected layout behavior. Think of it like two people trying to sit in the same chair – something's got to give, and like any good drama, it's the images that suffer and get ugly!

> Note: the width of the child element is relative to the available amount of space in the parent element.

##### Set width constraint with max-width (commit `84a1e07`)

-   While setting a container's width to 90% of its parent helps with responsiveness, there's a catch! As the viewport (the parent) grows wider, your text lines become uncomfortably long, making content harder to read. That's where max-width comes to the rescue!
-   By limiting the container to 800 pixels, we create an optimal reading experience across all screen sizes.

- Let's talk about an interesting edge case with our main image! While we've set its max-width to 600 pixels, there's something magical happening here – since its parent container is capped at 800 pixels, our image would never exceed that width anyway.

- Now, here's where it gets fascinating: Because our image isn't taking up the full container width, it naturally aligns to the left (thanks to that default text-align property we all know and love). 

- But wait – there's a plot twist! When we try to center it using margin: 0 auto, nothing happens. Why? Because images are born as inline elements – they're literally designed to flow with text! They ignore margins and don't naturally expand to their parent's width. This is why we need that powerful display: block declaration to make our centering dreams come true.

> Note: I create a javascript code snippet to display the image's width in the `main-image-size-display` span element.

> Update: I don't use min-width on elements most of the time. Why? 
> - min-width is a good choice for elements that should never shrink below a certain width.
> - But it's not as flexible as max-width, which allows for more dynamic resizing.
> - For example, if you have an image which never shrinks below 320px (min-width: 320px), in case of the screen is less than 320px, the image will overflow, unless you clip it using `overflow: hidden` on the parent element.

#### The `em` unit (commit `85565f8`)

The em unit is like a chameleon in CSS – it changes its reference point based on context!

-   When you're using it for spacing properties like padding and margin, it looks at the current element's font size and says "That's my guide!"
-   But here's the plot twist – when you use it for font-size itself, it looks up to the direct parent element and says "That's my reference point!"

Here's a quick example:
```html
<div class="parent">
    <div class="child">
        <p>Hello, world!</p>
    </div>
</div>
```
```css
.parent {
    font-size: 20px;        /* Base size */
}
.child {
    font-size: 0.5em;       /* 20px × 0.5 = 10px */
    padding: 1em;           /* 10px × 1 = 10px (based on its own font-size) */
    margin-bottom: 1.5em;   /* 10px × 1.5 = 15px */
}
.parent p { /* specificity: */
    font-size: 1em; /* 10px × 1 = 10px */
}
```

##### Absolute units are bad for responsive design and accessibility 
- ... because they don't adapt to the screen size.
- When you hard-code your website's font sizes and spacing using absolute units like pixels, you're essentially telling your users, "Sorry, your browser preferences don't matter!" If a user changes their default font size from 16px to 20px (perhaps due to vision needs), your website remains stubbornly fixed – creating potential accessibility barriers and a frustrating user experience. The last resort for users is to use the browser's zoom feature, which can be a pain.


> Side note: What about the direct parent of a child element (already have a font-size set) have no font-size set?
>
> The child element will look for the nearest parent element with a font-size set. If no parent element has a font-size set, the child element will use the default font-size of the browser, which is 16px.
```html
<div class="parent">
    <div class="child">
        <p class="hello">Hello, world!</p>
    </div>
</div>
```
```css
.parent {
    font-size: 20px;
}
.child {
}
.hello {
    font-size: 1em; /* 20px (parent's font-size) × 1 = 20px */
}
```


##### Pay attention: `commit: 467900f`
```css
h1 {
    font-size: 2.25em;
}
.subheading {
    font-size: 1.25em;
}
```
```html
<h1>Hello, world! <span class="subheading">Subheading</span></h1>
```

You set .subheading font-size to 1.25em, thinking the result will be 20px. But wait! What actually happens is mind-blowing:

html: 16px
body: 16px (inherited from the root/html element)
h1: 16px × 2.25 = 36px
.subheading: 36px × 1.25 = 45px

because, with the `em` unit, the .subheading element is a child of the h1 element, it will use the h1 element's font-size as its reference point.

Suddenly, your nested elements are growing exponentially – like a snowball rolling down a hill!


##### Margins and Padding (commit `9ce7a6c`)
when using `em` units for margins and padding, the value is relative to the current element's font-size.

>  Challenge:
>   1. Convert the padding value of .btn from px to em
>   2. Space buttons both horizontally and vertically using margins and em units
>   3. Convert the font-size of .btn from px to em

for button's/links decorated as buttons' paddings, top and bottom are set to a half of the font-size (0.5em), and left and right are set to the font-size (1em). In this case 1/2 em of 18px

for button's/links decorated as buttons' margins, top and bottom are set to the font-size (1em), and left and right are set to half of the font-size (0.5em). In this case 1 em of 18px

then I convert the font-size of .btn from px to em, from 18px to 1.125em.

> Challenge:
>  1. Convert the padding of header, section, and footer from px to em
>  2. Convert the bottom-margin of .main-image from px to em


##### An `em` value can compound from one level to the other (commit `1be6a38`)
https://scrimba.com/the-frontend-developer-career-path-c0j/~0iu

> Whenever you have nested elements with font-size set in `em`, the value can compound from one level to the other.

Here's a quick example:
```html
    <section class="section-zero"> <!-- 10px -->
        <div class="parent">
            <div class="child">
                <h1 class="heading">Name</h1> <!-- 20px -->
                <p class="title">Title</p>
            </div>
        </div>
    </section>
```

```css
.section-zero {
    background-color: darkorchid;
    color: white;
    font-size: 10px;
}

.heading {
    font-size: 2em; /* 20px */
}


/* Set font-size value for the parent of .heading element */
.child {
    font-size: 2em; /* 20px */
}
```

The .heading's font-size no longer has value of 20px but 2 times of its parent (2em * 10px).

=> Use `em` unit on font-size creates compound effect from one level to another.

=> To solve this cascading compound effect, introducing rem unit.

#### REM
An rem unit is always relative to the root <html> element and ignores the font-size of its parent element or any other ancestor element.
```css
html {
    font-size: 20px;
}
```

Change `em` to `rem` is straightforward. Except for .subheading, which is a child of h1 element, since change it to rem, it ignores the h1 element's font-size, and uses the root html element's font-size. So to get the font-size of .subheading to be 20px, we need to set the font-size of .subheading to 1.25rem (20/16, not 20/36 any more), not changing it from 0.55em to 0.55rem like other elements.
```css 
.subheading {
    display: block;
    /* font-size: 20px; */
    font-size: 1.25rem;
    color: #d0aaff;
}
```

##### Line height
- Line height property is used to set the height of the line box. It adds space above and below the text in horizontal writing mode and left and right space in vertical writing mode.

- When an element is set to `line-height: 2`, it means the line height will be 2 times the element's font size. Let's visualize this! (line-height is inherited from the parent element if no line-height is set on the element itself.)
```css
p {
    font-size: 16px;
    line-height: 2; /* 16px * 2 = 32px */
}
```

- highly recommended to use unitless line height value. Why?
```css
/* ❌ Using units */
.parent {
    font-size: 16px;
    line-height: 32px;    /* Fixed at 32px */
}
.child {
    font-size: 32px;      /* Still has 32px line-height - looks cramped! */
}

/* ✅ Using unitless */
.parent {
    font-size: 16px;
    line-height: 2;       /* 2 times the font-size */
}
.child {
    font-size: 32px;      /* Gets 64px line-height (2 × 32px) - properly scaled! */
}
```
> Note: line-height is inherited from the parent element if no line-height is set on the element itself.

> Rule of thumbs: Set line-height at 1.5 times the font-size (150%).

> Read more: https://css-tricks.com/how-to-tame-line-height-in-css/
> Fun: https://css-tricks.com/fun-line-height/


- Use this code snippet to visualize the line height.
> Source: https://stackoverflow.com/questions/19032484/css-inspecting-line-height-in-browsers
```html
<p><span style="border: 1px solid red; display: inline-block; line-height: 1.5;">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</span> World</p>
```


#### How I decide which unit to use?
`px, %, em, rem, unitless`
1. Font sizes:
    - Use rem to avoid compound effect from one level to another.
2. Margin and padding: 
    - Use em
    - Proportional scaling (resize)
    - Based on element's current font-size
    - Works great when setting margin on heading and paragraph elements.
3. Line height:
    - Use unitless value
4. Width:
    - Use %
    - Flexible containers
    - Flexible images
5. Max-width:
    - Use px
    - Easier to manage
    - Ensure consistency: it looks the same on any device and different screen sizes. The width doesn't exceed even on the largest screen.


## Media queries
You can use media queries to apply different styles to different screen sizes. (modify layout design based on different screen size)

- Think media queries as conditional statements in CSS.

For example, if the screen width is greater than or equal to 375px (min-width: 375px), apply different styles to the layout. Else, ignore the styles in the media query.
https://codepen.io/fireantx/pen/JoPyKJL?editors=0111
/*
 Challenge: 
   - Create a media query that targets a minimum browser width of 375px (375px is called breakpoint)
   - In the media query, update the body's color and background
*/

```css
/* the minimum width of the browser to apply the styles */
@media (min-width: 375px) {
    /* styles for large screens */
    body {
        background-color: #000;
        color: #fff;
    }

    h1 {
        font-size: 3rem;
    }
}
```

- Breakpoints are the points where the layout design changes:
    - Change layout design based on different screen size
    - Update text size
    - Page adjustments

I can also use:
```css
@media (min-width: 375px and max-width: 768px) {
    /* styles for small screens */
}
```

Read more:
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media#media_features
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries


## Add media queries to the site
> Note: In small screen, if I set the parent element to display flex, the images will stretch to the full width of the container by default without me setting the width of the images to 100%, and remain responsive within the container, until I set the parent's element align-items to center, images act unexpectedly.

```css
.section-two-image-container {
    display: flex;
    /* align-items: center; */
    flex-direction: column;
    gap: 1em;
}


.feature-image {
    /* width: 100%; */
    border-radius: 4.6px;
}
```

## Think Mobile First CSS
- Write your base CSS with mobile devices in mind first.
- Optimize for mobile devices first.
- Use media queries to adjust the layout and styles for larger screens.

Because:
- Mobile users are more than desktop users.
- Mobile first design is based on the default styles of elements (single column of content which is the normal flow of the page), avoid writing css for larger screens then using media queries to reset the styles back to the default styles.

## The Mobile-First Revolution: A Smart Approach to Modern CSS

Picture this: instead of fighting against the natural flow of HTML and CSS, we work with it from the ground up.

Here's the strategy that's transforming how we build websites:

1. Start with Your Mobile Foundation
   Begin with clean, focused styles that embrace the natural flow of content. Think single-column layouts that work beautifully on smaller screens.

2. Layer on Complexity
   As screens get larger, progressively enhance your design using media queries. It's like building with LEGO blocks - start with the foundation, then add sophisticated features for larger displays.

Why This Approach Works:
- It aligns perfectly with user behavior - mobile traffic now dominates the web
- You're working with CSS's natural flow instead of fighting against it
- Your code stays cleaner and more maintainable
- Performance improves because you're loading only what's needed

Here's the game-changing insight: when you build mobile-first, you're not just adapting to different screen sizes - you're creating a more focused, user-centered experience from the ground up.

## Mobile-First CSS in Action
- Look at how we use less code to achieve the same result.
  - remove the parent container of feature-image
  - add the width of feature-image to 100%
  - in media query, add display flex to the parent container of feature-image, remove flex-direction: row (flex container default is row)

  ## Mobile-First also means Content First
  - Display the content users need on mobile devices and nothing extra.
  - For example, get rid of extra spaces.
  /*
    1. Create a new media query that targets a browser width of 768px or wider. 
    2. Within the media query, select the header, section, and footer elements
       and apply a top and bottom padding of 2.875em.
    3. Adjust the initial padding for the header, section and footer elements.
       Set a top and bottom padding value in em equal to 20px.
*/

## Adapt the buttons for smaller screens
Why?
- Because on mobile devices, users interacts with buttons and links via touch events.
- So the buttons and links should be large enough to be easily accessible vs. the precise click of the mouse cursor on laptop or desktop.

/*
  Challenge:
    - On narrow screens, each button should take up the full width
      of their container 
    - The buttons should display on the same row only at the 768px breakpoint
*/

In mobile first css thinking, each element should take up the full width of the container by default (display: block).

## Adjust font size for smaller screens
/*
  Challenge: Responsive text
    - h1:
        - Initial size: rem value equal to 28px (1.75rem) 
        - At 768px: increase to  36px (2.25rem)
    - h2:
        - Initial size: rem value equal to 22px (1.375rem)
        - At 768px: increase to 28px (1.75rem)
    - .subheading:
        - Initial size: suitable for smaller screens
        - At 768px: increase to 1.25rem  
    - Paragraphs:
        - At 768px: increase to rem value equal to 18px
*/

## Create a mobile-first navigation
-

-

/*
  Challenge: Write initial nav styles
    1. Center-align the header content
    2. Apply a top margin to the nav element to create space
       between the nav and subheading
    3. Make sure that the center alignment, the nav’s top margin,
       and dotted borders between links display only on viewport widths
       narrower than 768px
*/

This challenge is a great example of how to think mobile first css.
I used to think that mobile first css is about using min-width to apply styles to smaller screens all the time and ignore max-width.

However, with this example, I learned that mobile first css is all about take advantage of the default styles of elements to make mobile-first design. AND avoid repeating the code, in this case, if I set these style in the @media (max-width: 767px) out of the media query, on mobile first css, I have changed the default styles of the elements, which is not a good practice. If I did it, I need to come to @media (min-width: 768px) (on larger screens) to reset the styles back to the default styles, like this:
```css
@media (min-width: 768px) {
    /* existing styles */

    header {
        text-align: left;
    }

    .nav {
        margin-top: 0;
    }

    .nav-list li {
        border-bottom: none;
    }
}
```

So, in this case, max-width comes into rescue.


## Mobile-first nav: Wider screens
/*
  Challenge: Navigation styles for wider screens
    1. Use flexbox to display the navigation horizontally
       on one row when the screen is 768px or wider
    2. Align the nav with the right edge of its container
    3. Apply space between each link with a margin
    4. On wider screens, all of the content inside the header
       should be vertically centered
*/