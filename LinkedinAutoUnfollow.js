(() => {
    let count = 0;

    function getAllButtons() {
        return document.querySelectorAll('button.artdeco-button--muted.artdeco-button--secondary') || [];
    }

    async function unfollowAll() {
        const buttons = getAllButtons().forEach(button => {
            const buttonText = button.innerText || "";
            if (buttonText.includes("Following")) {
                count = count + 1;

                // NOTE: The way to get the name might change since the structure was not fully provided.
                // Just logging the count for now. You can add name logging by identifying the right DOM structure.
                console.log(`Unfollow #${count}`);

                window.scrollTo(0, button.offsetTop - 260);
                button.click();

                // Wait for a little while before moving to the next button.
                return new Promise((resolve) => setTimeout(resolve, 100));
            }
        });
    }

    async function run() {
        await unfollowAll();
        window.scrollTo(0, document.body.scrollHeight);

        // Wait for a second for potential new buttons to load.
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const buttons = getAllButtons();

        // If there are more buttons, run the script again.
        if (buttons.length) run();
    }

    run();
})();
