// Guiones que se ejecutan en <head> antes de pintar, para que ni el tema ni el
// ancho del carril cambien al cargar. Viven aquí, fuera de los componentes de
// cliente: un texto exportado desde un fichero 'use client' llega al servidor
// como referencia de cliente, no como texto, y el <head> pintaba un error.
export const LLAVE_TEMA = 'devsparring.tema';
export const LLAVE_CARRIL = 'devsparring.carril';

export const GUIONES_CABECERA = `(function(){try{var t=localStorage.getItem('${LLAVE_TEMA}');if(t==='claro')document.documentElement.dataset.theme='light';else if(t==='oscuro')document.documentElement.dataset.theme='dark';if(localStorage.getItem('${LLAVE_CARRIL}')==='compacto')document.documentElement.dataset.carril='compacto';}catch(e){}})()`;
