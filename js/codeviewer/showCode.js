const showcodetext = "Show Page Code";
const hidecodetext = "Hide Page Code";
document.addEventListener("DOMContentLoaded", function () {
    // Create the button
    const button = document.createElement("button");
    button.textContent = showcodetext;
    button.style.margin = "10px";
    button.style.padding = "10px";
    button.style.cursor = "pointer";

    // Create the text area
    const textArea = document.createElement("textarea");
    textArea.style.width = "100%";
    textArea.style.height = "200px";
    textArea.style.display = "none"; // Hidden by default
    textArea.style.margin = "10px";

    // Create the copy button
    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy to Clipboard";
    copyButton.style.margin = "10px";
    copyButton.style.padding = "10px";
    copyButton.style.cursor = "pointer";
    copyButton.style.display = "none"; // Hidden by default

    // Append elements to the body
    document.body.appendChild(button);
    document.body.appendChild(textArea);
    document.body.appendChild(copyButton);

    // Show page code in the text area on button click
    button.addEventListener("click", function () {
        if (button.textContent == showcodetext) {
            // console.log(button);
            button.textContent = hidecodetext;
            const pageCode = document.documentElement.outerHTML;

            textArea.value = pageCode;
            textArea.style.display = "block";
            copyButton.style.display = "inline-block";
        }
        else {
            button.textContent = showcodetext;
            textArea.style.display = "none";
            copyButton.style.display = "none";



        }
    });

    // Copy the code to clipboard on copy button click
    copyButton.addEventListener("click", function () {
        textArea.select();
        // alert(textArea.value);
        navigator.clipboard.writeText(textArea.value);
        // const text = await navigator.clipboard.readText();
        // textarea.value = text;
        // navigator.clipboard.
            alert("Page code copied to clipboard!");
    });
});