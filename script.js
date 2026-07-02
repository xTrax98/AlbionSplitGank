
const $=id=>document.getElementById(id);
const fields=["fecha","nombre","tabla","reparacion","porcentajeVenta","porcentajeImpuestos","bolsas","jugadores"];
if(!$("fecha").value){
 const d=new Date();
 d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
 $("fecha").value=d.toISOString().slice(0,16);
}
fields.forEach(f=>{
 const v=localStorage.getItem(f);
 if(v)$ (f).value=v;
 $(f).addEventListener("input",calc);
});
function n(v){return Number((v||"").replace(/\./g,"").replace(",","."))||0;}
function f(v){return Math.round(v).toLocaleString("es-ES");}
function save(){fields.forEach(x=>localStorage.setItem(x,$(x).value));}

function calc(){
 save();

 const tabla=n($("tabla").value),
       rep=n($("reparacion").value),
       bol=n($("bolsas").value),
       jug=Math.max(1,Number($("jugadores").value)||1);

 const neta=Math.max(0,tabla-rep);
 const pv=Number($("porcentajeVenta").value)||82.5;
 const pi=Number($("porcentajeImpuestos").value)||0;

 const venta=neta*(pv/100);
 const subtotal=venta+bol;
 const impuestos=subtotal*(pi/100);
 const total=subtotal-impuestos;
 const split=total/jug;

 $("ventaPct").textContent=String(pv).replace(".",",");
 $("impPct").textContent=String(pi).replace(".",",");

 $("neta").textContent=f(neta);
 $("venta").textContent=f(venta);
 $("impuestos").textContent=f(impuestos);
 $("total").textContent=f(total);
 $("split").textContent=Math.round(split).toString();
}

function copiar() {
    alert("El botón funciona");
}

function limpiar(){
 fields.forEach(f=>$(f).value="");
 localStorage.clear();
 calc();
}
calc();
