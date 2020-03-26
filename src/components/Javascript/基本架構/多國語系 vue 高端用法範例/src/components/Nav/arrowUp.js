/**
 * Ian: 靠北有夠難做
 * https://gomakethings.com/how-to-get-the-first-and-last-focusable-elements-in-the-dom/
 * https://github.com/davidtheclark/tabbable/blob/master/index.js
 */
export const handleArrowMixin = {
    methods: {
        handleArrowUp(event) {
            if (event.keyCode === 38) {
                const currentNode = event.target
                let lastTabbable = null
                const focusable = this.getFocusable()
                focusable.forEach((tabbableNode, index) => {
                    if (tabbableNode.isSameNode(currentNode)) {
                        lastTabbable = focusable[index - 1]
                    }
                })
                if (lastTabbable.classList.contains('nav__item__btn')) {
                    const { navid } = lastTabbable.dataset
                    const navButtons = document.querySelectorAll(`.nav__item__btn${navid}`)
                    navButtons.forEach(node => {
                        if (node.classList.contains('nav__item__btn--active')) {
                            node.focus()
                        }
                    })
                }
            }
        },
        getFocusable() {
            const candidateSelectors = [
                'input',
                'select',
                'textarea',
                'a[href]',
                'button',
                '[tabindex]',
                'audio[controls]',
                'video[controls]',
                '[contenteditable]:not([contenteditable="false"])',
            ];
            const focusable = document.querySelectorAll(candidateSelectors)
            return focusable
        }
    }
}