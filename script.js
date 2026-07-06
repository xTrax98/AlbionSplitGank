
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

tabNeta:"Rep./Jugador",
ventaTxt:"Venta",
impuestosTxt:"Impuestos",
lootTotal:"Loot Total",
lootSplit:"Loot Split",

copiar:"📋 Copiar para Discord",
limpiar:"🧹 Limpiar",

copiado:"Copiado.",
error:"No se pudo copiar.",

infoTitulo:"📋 ¿Cómo se calcula el Loot Split?",

infoContenido:`
<p><strong>Fórmula utilizada:</strong></p>

<ol>
<li><strong>Loot Tabla × % Venta = Venta Tabla</strong></li>
<li><strong>Venta Tabla + Loot Bolsas = Subtotal</strong></li>
<li><strong>Subtotal × % Impuestos = Impuestos</strong></li>
<li><strong>Subtotal - Impuestos = Loot Total</strong></li>
<li><strong>Loot Total ÷ Jugadores = Split Bruto</strong></li>
<li><strong>Reparación ÷ Jugadores = Reparación por Jugador</strong></li>
<li><strong>Split Bruto - Reparación por Jugador = Loot Split Final</strong></li>
</ol>

<hr>

<p><strong>Ejemplo</strong></p>

<p>
Loot Tabla: <b>10.000.000</b><br>
Venta (82,5%): <b>8.250.000</b><br>
Loot Bolsas: <b>1.200.000</b><br>
Subtotal: <b>9.450.000</b><br>
Impuestos (5%): <b>472.500</b><br>
Loot Total: <b>8.977.500</b><br>
Jugadores: <b>7</b><br>
Split Bruto: <b>1.282.500</b><br>
Reparación: <b>700.000</b><br>
Rep./Jugador: <b>100.000</b><br><br>

<b>Loot Split Final: 1.182.500</b>
</p>
`
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

tabNeta:"Repair/Player",
ventaTxt:"Sale Value",
impuestosTxt:"Taxes",
lootTotal:"Total Loot",
lootSplit:"Loot Split",

copiar:"📋 Copy for Discord",
limpiar:"🧹 Clear",

copiado:"Copied.",
error:"Unable to copy.",

infoTitulo:"📋 How is the Loot Split calculated?",

infoContenido:`
<p><strong>Formula used:</strong></p>

<ol>
<li><strong>Loot Value - Repair Cost = Net Loot</strong></li>
<li><strong>Net Loot × Sale % = Sale Value</strong></li>
<li><strong>Sale Value + Bag Loot = Subtotal</strong></li>
<li><strong>Subtotal × Tax % = Taxes</strong></li>
<li><strong>Subtotal - Taxes = Total Loot</strong></li>
<li><strong>Total Loot ÷ Players = Loot Split</strong></li>
</ol>

<hr>

<p><strong>Example</strong></p>

<p>
Loot Value: <b>10,000,000</b><br>
Repair Cost: <b>500,000</b><br>
Net Loot: <b>9,500,000</b><br><br>

Sale (82.5%): <b>7,837,500</b><br>
Bag Loot: <b>1,200,000</b><br>
Subtotal: <b>9,037,500</b><br>
Taxes (5%): <b>451,875</b><br><br>

Total Loot: <b>8,585,625</b><br>
Players: <b>7</b><br><br>

<b>Loot Split: 1,226,518</b>
</p>
`
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

    // Información del cálculo
    $("tituloInfo").textContent = t.infoTitulo;
    $("contenidoInfo").innerHTML = t.infoContenido;
}

function calc(){
 save();

 const tabla=n($("tabla").value),
       rep=n($("reparacion").value),
       bol=n($("bolsas").value),
       jug=Math.max(1,Number($("jugadores").value)||1);

 const pv = Number($("porcentajeVenta").value) || 82.5;
const pi = Number($("porcentajeImpuestos").value) || 0;

// La reparación YA NO se resta a la tabla
const venta = tabla * (pv / 100);

const subtotal = venta + bol;

const impuestos = subtotal * (pi / 100);

const total = subtotal - impuestos;

// Reparto antes de descontar reparación
const splitBruto = total / jug;

// Reparación por jugador
const reparacionJugador = rep / jug;

// Split final
const split = splitBruto - reparacionJugador;

 $("ventaPct").textContent=String(pv).replace(".",",");
 $("impPct").textContent=String(pi).replace(".",",");

 $("neta").textContent=f(reparacionJugador);
 $("venta").textContent=f(venta);
 $("impuestos").textContent=f(impuestos);
 $("total").textContent=f(total);
 $("split").textContent=Math.round(split).toString();
}

function copiar(){

 const lang = $("idioma").value;

 let txt = "";

 if(lang === "es"){

txt=`💰 LOOT SPLIT

📅 ${$("fecha").value.replace("T"," ")}
🏴 ${$("nombre").value}

📦 Tab: ${f(n($("tabla").value))}
🛠 Reparación: ${f(n($("reparacion").value))}
🧍 Rep./Jugador: ${$("neta").textContent}
💲 Venta (${ $("ventaPct").textContent }%): ${$("venta").textContent}
💸 Imp. (${ $("impPct").textContent }%): ${$("impuestos").textContent}
🎒 Bolsas: ${f(n($("bolsas").value))}
👥 Jugadores: ${$("jugadores").value}

━━━━━━━━━━━━━━━━━━
💰 Total: ${$("total").textContent}
💵 Split: ${$("split").textContent} c/u
━━━━━━━━━━━━━━━━━━
⚔ Gank Split Manager by xTrux
https://xtrax98.github.io/AlbionSplitGank/`;

 } else {

txt=`💰 GANK LOOT SPLIT

📅 ${$("fecha").value.replace("T"," ")}
🏴 ${$("nombre").value}

📦 Loot: ${f(n($("tabla").value))}
🛠 Repair: ${f(n($("reparacion").value))}
🧍 Repair/Player: ${$("neta").textContent}
💲 Sale (${ $("ventaPct").textContent }%): ${$("venta").textContent}
💸 Tax (${ $("impPct").textContent }%): ${$("impuestos").textContent}
🎒 Bags: ${f(n($("bolsas").value))}
👥 Players: ${$("jugadores").value}

━━━━━━━━━━━━━━━━━━
💰 Total: ${$("total").textContent}
💵 Split: ${$("split").textContent} each
━━━━━━━━━━━━━━━━━━
⚔ Gank Split Manager by xTrux
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
