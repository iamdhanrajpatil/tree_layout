
let treeWidth  = window.screen.width;
let treeHeight = window.screen.height;

let canvas = d3.select("body")
    .append("svg")
    .attr("width", treeWidth)
    .attr("height", treeHeight)
    .append("g")
        .attr("transform", "translate(10,10)")
    // console.log(canvas);

// ========= tree layout ==================//
let tree = d3.layout.tree()
    .size([750, 1000]);
    // console.log(tree);

d3.json("mydata.json", (data)=>{
    console.log(data);


let nodes = tree.nodes(data); 
    // console.log(nodes);
    
// ========== for path b/w each nodes ==========//
let links = tree.links(nodes); 
    // console.log(links); 
canvas.selectAll(".link")
    .data(links)
    .enter()
    .append("path")
    .attr("class", "link")
    .attr("fill", "none")
    .attr("stroke", "#000")
    .attr("d", (d)=> {
        return "M" + d.source.y + "," + d.source.x + "h 210 V" + d.target.x + "H" + d.target.y ;
})

let node = canvas.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", (d)=>{ return "translate(" + d.y + ", " + d.x + ")"; })

    node.append("rect")
            .attr("width", 180)
            .attr("height", 50)
            .attr("fill", d=>{ return d.color})
            .attr("stroke", "#000")
            .attr("stroke-width", 2)
            .attr("y", -25)
            
    node.append("text")
        .text((d)=>{ return d.name })
        .attr("x", 40)
        .attr("y", 0)
        .attr("fill", "#fff")
       
    node.append("text")
        .text((d)=>{ return d.numbers})
        .attr("x", 40)
        .attr("y", 16)
        .attr("fill", "#fff")

  node.append("text") 
        .text((d)=>{ 
            let percentage =  d.numbers/8638*100;  
            return "(" + percentage.toFixed(1) + " %"+ ")";
        })
        .attr("x", 75)
        .attr("y", 16)
        .attr("fill", "#fff")
        
    d3.selectAll("rect","text")
        .on("click", (d,i)=>{
            alert(d.name + "\n" + d.numbers + "\n" + (d.numbers/8638*100).toFixed(1) + "%");
        })        
    d3.selectAll("text")
        .on("click", (d,i)=>{
            alert(d.name + "\n" + d.numbers + "\n" + (d.numbers/8638*100).toFixed(1) + "%");
        })        
    
})
 