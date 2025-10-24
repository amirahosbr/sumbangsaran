Just prompt in cli like example.. just "hey, generate angry red-panda ninja in charcoal hakama". then ai do all. the styles are default if not mentioned.

is it possible.. to create where, i just prompt in cli like example.. just hey, generate angry red-panda ninja in charcoal hakama. then they do all style is default if not mentioned.

---

1. generate full body base character image but with the canvas rules applied.
2. generate variation images based on base character image but with the canvas rules applied.
    - variation images are different facial expression, different pose, different background, different props, etc.
    - character design, head-only icon, secret agent, 4-panel comic spread, mascot
3. if user want to edit the image, they can edit the image with the canvas rules applied. 

---

1. use gpt-1-image to edit existing image. or have other images as reference. (user upload their own images -> use gpt-1-image)
2. new image -> use gpt-5 to generate image.
3. gpt-1-image: cannot have canvas rules applied.
4. gpt-5: can have canvas rules applied.


---

canvas rule applied is: `
    CANVAS LAYOUT:
    - Square ${canvas.aspect} aspect ratio, fixed 1:1 format (like an Instagram post).
    - Character perfectly centered both vertically and horizontally.
    - Inner padding of about ${canvas.paddingPx}px visual spacing, ensuring no part of the character touches the canvas edges.
    - The background fills all remaining space evenly with a solid flat color (no frame or border).
    - The character stands clearly visible in the middle of the square, with a soft neutral drop shadow under their body.
    `
1. generate full body base character image but with the canvas rules applied.
2. generate variation images based on base character image but with the canvas rules applied.
    - variation images are different facial expression, different pose, different background, different props, etc.
    - images that i want to generate are character design (full body but different pose/facial/props), head-only icon, secret agent, 4-panel comic spread, mascot (with the canvas rules applied)

