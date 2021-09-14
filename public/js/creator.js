function createlement(element,xlass){
     let item = document.createElement(element);
     item.setAttribute("class",xlass);
     item.setAttribute("id",xlass);
     item.setAttribute("name",xlass);
     return item;
}

function institution (){
    let parent = createlement("div","parent-div");
    let institition = createlement("input","institition");
    let insti_wrapper = createlement("div","insti-wrapper");
    let saveBtn = createlement("button","save-button");
    insti_wrapper.appendChild(institition)
    parent.appendChild(insti_wrapper);
    parent.appendChild(saveBtn);
    return parent;
}


console.log(institution())