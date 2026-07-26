# WORKFLOW

## Feature Chosen
Homepage with a hero section, a navbar with gallery filters, and a gallery presented in a Netflix-like style.

## Correctness
The gallery filters returned the expected items, and each card opened the correct single page. However, some behavior felt incomplete or assumed, so I checked whether the implementation truly matched the feature requirements.

Example:
- Filter state was connected to the visible cards.
- The Home page was implemented well, but it felt more like a generic website than something inspired by Netflix.
- The layout was responsive across different screen sizes.


## Accessibility
The vague prompt supported accessibility fairly well because it used semantic elements, visible focus states, and meaningful labels. Keyboard navigation worked more reliably, and the structure was easier for screen readers to understand.

Example:
- Buttons were implemented as actual buttons, not clickable divs.
- Empty and active states were easier to understand.

## Edge Cases
Several details were assumed. Some buttons did not work, and because no placeholder image was provided, alt text was not implemented.

Example:
- No placeholder image was provided, so alt text was not added.
- Some buttons were assumed, so the extra actions had no functionality.


## Review Effort
The Home page was built well, but the overall feel of the website was still more generic than Netflix-like.

Example:
- The prompt produced more of a generic website style.
- Need more improvment in the UI.
- Code splitting would improve scalability.

## Conclusion
This exercise shows that a vague prompt can still generate a good website. However, the UI goal was not fully achieved because the result felt more generic than Netflix-inspired.