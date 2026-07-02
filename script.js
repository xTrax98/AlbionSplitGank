
const $=id=>document.getElementById(id);

const textos = {

es:{
titulo:"🗡️ Gank Split Manager by xTrux",

fecha:"Fecha-Hora",
nombre:"Nombre",
tabla:"Loot Tab",
reparacion:"Reparación",
venta:"% Venta Tabla",
impuestos:"% Impuestos",
bolsas:"Loot Bolsas",
jugadores:"Jugadores",

tabNeta:"Tab Neta",
ventaTxt:"Venta",
impuestosTxt:"Impuestos",
lootTotal:"Loot Total",
lootSplit:"Loot Split",

copiar:"📋 Copiar para Discord",
limpiar:"🧹 Limpiar",

copiado:"Copiado.",
error:"No se pudo copiar."
},

en:{
titulo:"🗡️ Gank Split Manager by xTrux",

fecha:"Date & Time",
nombre:"Name",
tabla:"Loot Value",
reparacion:"Repair Cost",
venta:"% Sale Value",
impuestos:"% Taxes",
bolsas:"Bag Loot",
jugadores:"Players",

tabNeta:"Net Loot",
ventaTxt:"Sale Value",
impuestosTxt:"Taxes",
lootTotal:"Total Loot",
lootSplit:"Loot Split",

copiar:"📋 Copy for Discord",
limpiar:"🧹 Clear",

copiado:"Copied.",
error:"Unable to copy."
}

};

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

function cambiarIdioma(){

    const lang = $("idioma").value;
    localStorage.setItem("idioma", lang);

    const t = textos[lang];

    $("titulo").textContent = t.titulo;

    $("lblFecha").textContent = t.fecha;
    $("lblNombre").textContent = t.nombre;
    $("lblTabla").textContent = t.tabla;
    $("lblReparacion").textContent = t.reparacion;
    $("lblVenta").textContent = t.venta;
    $("lblImpuestos").textContent = t.impuestos;
    $("lblBolsas").textContent = t.bolsas;
    $("lblJugadores").textContent = t.jugadores;

    $("txtNeta").textContent = t.tabNeta;
    $("txtVenta").textContent = t.ventaTxt;
    $("txtImpuestos").textContent = t.impuestosTxt;
    $("txtTotal").textContent = t.lootTotal;
    $("txtSplit").textContent = t.lootSplit;

    $("btnCopiar").textContent = t.copiar;
    $("btnLimpiar").textContent = t.limpiar;
}

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

function copiar(){

 const lang = $("idioma").value;

 let txt = "";

 if(lang === "es"){

txt=`💰 LOOT SPLIT GANKEO

📅 Fecha
${$("fecha").value.replace("T"," ")}

🏴 Nombre
${$("nombre").value}

📦 Loot Tabla
${f(n($("tabla").value))}

🛠 Reparación
${f(n($("reparacion").value))}

📉 Tabla Neta
${$("neta").textContent}

💲 Venta Tabla (${$("ventaPct").textContent}%)
${$("venta").textContent}

💸 Impuestos (${$("impPct").textContent}%)
${$("impuestos").textContent}

🎒 Loot Bolsas
${f(n($("bolsas").value))}

👥 Jugadores
${$("jugadores").value}

━━━━━━━━━━━━━━━━━━

💰 Loot Total
${$("total").textContent}

💵 Loot Split
${$("split").textContent} por jugador

━━━━━━━━━━━━━━━━━━
⚔ Calculado con Gank Split Manager by xTrux
https://xtrax98.github.io/AlbionSplitGank/`;

 }else{

txt=`💰 GANK LOOT SPLIT

📅 Date
${$("fecha").value.replace("T"," ")}

🏴 Name
${$("nombre").value}

📦 Loot Value
${f(n($("tabla").value))}

🛠 Repair Cost
${f(n($("reparacion").value))}

📉 Net Loot
${$("neta").textContent}

💲 Sale Value (${$("ventaPct").textContent}%)
${$("venta").textContent}

💸 Taxes (${$("impPct").textContent}%)
${$("impuestos").textContent}

🎒 Bag Loot
${f(n($("bolsas").value))}

👥 Players
${$("jugadores").value}

━━━━━━━━━━━━━━━━━━

💰 Total Loot
${$("total").textContent}

💵 Loot Split
${$("split").textContent} per player

━━━━━━━━━━━━━━━━━━
⚔ Calculated with Gank Split Manager by xTrux
https://xtrax98.github.io/AlbionSplitGank/`;

 }

 navigator.clipboard.writeText(txt)
   .then(() => alert(textos[lang].copiado))
   .catch(() => alert(textos[lang].error));

}

function limpiar(){
 fields.forEach(f=>$(f).value="");
 localStorage.clear();
 calc();
}

const idiomaGuardado = localStorage.getItem("idioma") || "es";

$("idioma").value = idiomaGuardado;

cambiarIdioma();

calc();
