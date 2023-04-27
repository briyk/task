const image = document.getElementById("image");
const inputContainer = document.getElementById("input-container");
const tableBody = document.getElementById("table-body");

let currentInput = null;


function addInput(event) {
     const newInput = document.createElement("input");
     newInput.type = "text";
     newInput.classList.add('input-img');
     newInput.classList.add("form-control");

     newInput.style.position = "absolute";
     newInput.style.width = `${newInput.offsetWidth + 50}px`;
     const parentRect = event.target.getBoundingClientRect();
     const leftPercentage = (event.offsetX / parentRect.width) * 100;
     const topPercentage = (event.offsetY / parentRect.height) * 100;
     newInput.style.left = `${leftPercentage}%`;
     newInput.style.top = `${topPercentage}%`;

     // =============== Drag Functions
     let isDragging = false;
     let startX;
     let startY;

     newInput.addEventListener("mousedown", (event) => {
          isDragging = true;
          startX = event.clientX - newInput.offsetLeft;
          startY = event.clientY - newInput.offsetTop;
     });

     newInput.addEventListener("mousemove", (event) => {
          if (isDragging) {
               newInput.style.left = `${((event.clientX - startX) / image.clientWidth) * 100}%`;
               newInput.style.top = `${((event.clientY - startY) / image.clientHeight) * 100}%`;
           }
     });

     newInput.addEventListener("mouseup", () => {
          isDragging = false;
     });


     currentInput = newInput;
     inputContainer.appendChild(newInput);
}


function addValue() {
     //=====================if no values will do nothing
     if (!currentInput) {
          return;
     }

     const value = currentInput.value;
     if (value === "") {
          return;
     }
     //table input
     const inputName = document.createElement("input");
     inputName.type = "text";
     inputName.value = `Input ${tableBody.childElementCount + 1}`;

     const row = document.createElement("tr");
     const nameCell = document.createElement("td");
     const valueCell = document.createElement("td");

     nameCell.appendChild(inputName);
     row.appendChild(nameCell);

     const valueSpan = document.createElement("span");
     valueSpan.textContent = value;
     valueSpan.classList.add("value-text");
     valueCell.appendChild(valueSpan);

     row.appendChild(valueCell);
     tableBody.appendChild(row);

     currentInput.style.border = "none"
     currentInput.style.background = "none"

}

// ============= double click to create input , enter to add input to table 
image.addEventListener("dblclick", addInput);
document.addEventListener("keydown", (event) => {
     if (event.key === "Enter") {
          addValue();
     }
});
