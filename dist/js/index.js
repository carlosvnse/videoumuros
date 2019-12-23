import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    params: {
      "Part Number": "1001",
      "YEAR RANGE (xx-xx)": "Universal",
      Make: "",
      Model: "",
      Superscedes: "",
      "Other Key Information": "OBSOLETE",
      "Up to 20-Character Manufacturer Description": "TSHIRT NATION MENS-SM",
      "UPC (GTIN) Code": "849774005039",
      "Schedule B Harmonized Tariff Code: Click Here to Search": "61091000",
      "Up to 80 Character Manufacturer Description": "TSHIRT NATION MENS-SM",
      "ASC - Associated Comments - Up To 2000 Characters (Separated terms by)":""
    },
    datos: {
      idLabel: 0,
      path: '',
      name: 0,
      width: 400,
      height: 300,
      ppi: 200,
      vistaSeleccionada: "/",
      params: [
        
        { idParam:1,
          x:10,
          y:10,
          param:"Part Number",
          font:"monospace",
          fontSize:1.4,
          fontWeight:1000,
          italic:false,
          orientation:"izquierda-derecha"
        },
        { idParam:2,
          x:10,
          y:32,
          param:"Up to 80 Character Manufacturer Description",
          font:"monospace",
          fontSize:1.4,
          fontWeight:1000,
          italic:false,
          orientation:"izquierda-derecha"
        }
        /*{ idParam:3,
          x:0,
          y:100,
          param:"Part Number",
          font:"monospace",
          fontSize:1,
          fontWeight:100,
          italic:false,
          orientation:"izquierda-derecha"
        }*/
      ],
      images: [
        {
          idImage: 1,
          x: 2,
          y: 35,
          width: 30,
          height: 30,
          image: 'ce-logo.png'
        }
      ],
      texts: [
        { idText:1,
          x:50,
          y:100,
          text:"Made in Mexico.",
          font:'"Courier New", Courier, monospace',
          fontSize:1,
          fontWeight:1,
          italic:false,
          orientation:"izquierda-derecha"
        }
        /*{ idText:1,
          x:0,
          y:0,
          text:"Text 1",
          font:'"Courier New", Courier, monospace',
          fontSize:1,
          fontWeight:1,
          italic:false,
          orientation:"izquierda-derecha"
        },
        { idText:2,
          x:10,
          y:50,
          text:"Text 2",
          font:'"Lucida Console", Monaco, monospace',
          fontSize:1,
          fontWeight:1,
          italic:false,
          orientation:"izquierda-derecha"
        },
        { idText:3,
          x:100,
          y:100,
          text:"Text 3",
          font:"Helvetica, Arial, sans-serif",
          fontSize:1,
          fontWeight:1,
          italic:false,
          orientation:"izquierda-derecha"
        }*/
      ],
      barcodes: [
        {
          idBarcode: 1,
          x: 200,
          y: 50,
          text: "123456789012",
          param: "",
          format: "UPC",
          font: "monospace",
          fontSize: "10",
          fontWeight: 100,
          orientation: "inferior-superior",
          width: 200,
          height: 60,
          displayValue: true,
          textAlign: "center",
          textPosition: "middle"
        },
        {
          idBarcode: 2,
          x: 10,
          y: 100,
          text: "123456789012",
          param: "",
          format: "CODE128",
          font: "monospace",
          fontSize: "10",
          fontWeight: 100,
          orientation: "izquierda-derecha",
          width: 120,
          height: 60,
          displayValue: true,
          textAlign: "center",
          textPosition: "middle"
        }
      ],
      circles:[{
        idCircle:1,
        x:50,
        y:50,
        r:20,
        border:1
      }],
      boxes: [
        /*{
          idBox: 1,
          x: 0,
          y: 0,
          width: 60,
          height: 60,
          border: 1
        },
        {
          idBox: 2,
          x: 30,
          y: 30,
          width: 100,
          height: 100,
          border: 1
        }*/
      ],
      lines: [
        {
          idLine: 1,
          x:240,
          y:10,
          length:280,
          width:1,
          orientation:"VERTICAL"
        }
        /*{
        idLine: 1,
        x:20,
        y:20,
        length:50,
        width:1,
        orientation:"HORIZONTAL"
      },
      {
        idLine: 2,
        x:20,
        y:20,
        length:50,
        width:1,
        orientation:"VERTICAL"
      }*/
      ]
    },
    schema: {
      $schema: "http://json-schema.org/draft-07/schema#",
      $id: "http://example.com/label.schema.json",
      title: "Label",
      description: "Diseño de etiqueta",
      type: "object",
      properties: {
        idLabel: {
          description: "Identificador unico de la etiqueta",
          title: "Id",
          type: "integer",
          default: 0,
          readonly: true,
          row: 1,
          order: 1,
          cols: 12
        },
        name: {
          description: "Nombre descriptivo de la etiqueta",
          title: "Nombre",
          type: "string",
          default: "",
          readonly: true,
          row: 2,
          order: 1,
          cols: 12
        },
        width: {
          description: "Ancho de la etiqueta",
          title: "Ancho",
          type: "integer",
          default: 200,
          readonly: true,
          row: 3,
          order: 1,
          cols: 6
        },
        height: {
          description: "Alto de la etiqueta",
          title: "Alto",
          type: "integer",
          default: 200,
          row: 3,
          order: 2,
          cols: 6
        },
        resolucion: {
          description:
            "Resolución de la impresora para la que se diseña la etiqueta(en puntos por pulgada)",
          title: "Resolución",
          type: "integer",
          default: 200,
          row: 4,
          order: 2,
          cols: 6
        },
        imagenes: {
          type: "array",
          minItems: 0,
          items:{"$ref":"#imagen"}
        },
        texts: {
          type: "array",
          minItems: 0,
          items: {"$ref":"#text"}
        },
        lines: {
          type: "array",
          minItems: 0,
          items: {"$ref":"#line"}
        },
        boxes: {
            type: "array",
            minItems: 0,
            items:{"$ref": "#box"} 
        },
        barcodes: {
          type: "array",
          minItems: 0,
          items: {"$ref": "#barcode"}
        },
      },
      required: ["labelId", "name", "width", "height", "resolucion"],
      definitions: {
        "imagen":{
          "$id": "#imagen",
          title: "Imagen",
          description: "Imagen a desplegar en la etiqueta",
          type: "object",
          properties: {
            idIcon: {
              description:
                "Identificador unico del icono dentro de la etiqueta",
              title: "Id",
              type: "integer",
              readonly: true,
              default: 0,
              row: 1,
              order: 2,
              cols: 12
            },
            url: {
              description: "URL del icono",
              title: "URL",
              type: "string",
              default: "",
              row: 2,
              order: 2,
              cols: 12
            },
            width: {
              description: "Ancho de la etiqueta",
              title: "Ancho",
              type: "integer",
              default: 0,
              row: 3,
              order: 1,
              cols: 6
            },
            height: {
              description: "Alto de la etiqueta",
              title: "Alto",
              type: "integer",
              default: "",
              row: 3,
              order: 2,
              cols: 6
            },
            x: {
              description: "Posición izquierda de la imagen",
              title: "X",
              type: "integer",
              default: "",
              row: 4,
              order: 1,
              cols: 6
            },
            y: {
              description: "Posición superior de la imagen",
              title: "Y",
              type: "integer",
              default: "",
              row: 4,
              order: 2,
              cols: 6
            }
          },
          required: ["idIcon", "url", "x", "y", "width", "height"]
        },
        "text": {
          "$id": "#text",
          title: "Text",
          description: "Texto a presentar en la etiqueta",
          type: "object",
          properties: {
            idText: {
              description:
                "Identificador del Texto a   desplegar dentro de la etiqueta",
              title: "Id",
              type: "integer",
              readonly: true,
              default: "",
              row: 1,
              order: 1,
              cols: 12
            },
            text: {
              description: "Texto a desplegar",
              title: "Texto",
              type: "string",
              default: "",
              row: 2,
              order: 1,
              cols: 12
            },
            x: {
              description: "Posición izquierda del texto",
              title: "X",
              type: "integer",
              default: 0,
              row: 2,
              order: 1,
              cols: 6
            },
            y: {
              description: "Posición superior del texto",
              title: "Y",
              type: "integer",
              default: 0,
              row: 2,
              order: 2,
              cols: 6
            },
            font: {
              description: "Font family del texto",
              title: "Fuente",
              type: "string",
              default: "",
              row: 3,
              order: 1,
              cols: 12
            },
            fontSize: {
              description: "Tamaño de la fuente (1=Tamaño de la fuente global)",
              title: "Tamaño de la fuente",
              type: "number",
              default: 14,
              row: 4,
              order: 1,
              cols: 6
            },
            fontWeight: {
              description: "Remarcado de la fuente",
              title: "Remarcado",
              type: "number",
              default: 10,
              row: 4,
              order: 2,
              cols: 6
            },
            italic: {
              description: "Desplegar fuente en italica",
              title: "Italica",
              type: "boolean",
              default: false,
              row: 5,
              order: 1,
              cols: 12
            },
            orientation: {
              description: "Orientación",
              title: "Orientación",
              type: "string",
              default: "izquierda-derecha",
              row: 5,
              order: 1,
              cols: 12
            }
          },
          required: ["idText", "text", "x", "y"]
        },
        "line":{
          "$id": "#line",
          title: "Line",
          description: "Linea a desplegar en la etiqueta",
          type: "object",
          properties: {
            idLine: {
              description: "Identificador la linea",
              title: "Id",
              type: "integer",
              readonly: true,
              default: 0,
              row: 2,
              order: 1,
              cols: 12
            },
            width: {
              description: "Ancho en pixels de la linea",
              title: "Ancho",
              type: "integer",
              default: 1,
              row: 2,
              order: 1,
              cols: 6
            },
            lenght: {
              description: "Largo de la linea",
              title: "Largo",
              type: "integer",
              default: 0,
              row: 2,
              order: 2,
              cols: 6
            },
            x: {
              description: "Posición izquierda de la linea",
              title: "X",
              type: "integer",
              default: 0,
              row: 3,
              order: 1,
              cols: 6
            },
            y: {
              description: "Posición superior de la linea",
              title: "Y",
              type: "integer",
              default: 0,
              row: 3,
              order: 2,
              cols: 6
            },
            orientation: {
              borde: "Orientacion de la linea",
              title: "Orientación",
              type: ["Vertical", "Horizontal"]
            }
          },
          required: ["idIcon", "url", "x", "y", "width", "height"]
        },
        "box": {
          "$id": "#box",
          title: "Box",
          description: "Recuadro a desplegar en la etiqueta",
          type: "object",
          properties: {
            idBox: {
              description: "Id del recuadro",
              title: "Id",
              type: "integer",
              readonly: true,
              default: 0,
              row: 1,
              order: 1,
              cols: 12
            },
            width: {
              description: "Ancho del recuadro",
              title: "Ancho",
              type: "integer",
              default: 0,
              row: 2,
              order: 1,
              cols: 6
            },
            height: {
              description: "Alto del recuadro",
              title: "Alto",
              type: "integer",
              default: 0,
              row: 2,
              order: 2,
              cols: 6
            },
            x: {
              description: "Posición izquierda del recuadro",
              title: "X",
              type: "integer",
              default: 0,
              row: 3,
              order: 1,
              cols: 6
            },
            y: {
              description: "Posición superior del recuadro",
              title: "Y",
              type: "integer",
              default: 0,
              row: 3,
              order: 2,
              cols: 6
            },
            border: {
              borde: "Borde en pixels del recuadro",
              title: "B",
              type: "integer",
              default: 1,
              row: 4,
              order: 1,
              cols: 6
            }
          },
          required: ["idIcon", "url", "x", "y", "width", "height"]
        },
        "barcode": {
          "$id": "#barcode",
          title: "Barcode",
          description: "Barcode a presentar en la etiqueta",
          type: "object",
          properties: {
            idBarcode: {
              description:
                "Identificador del barcode a desplegar dentro de la etiqueta",
              title: "Id",
              type: "integer",
              readonly: true,
              default: 0,
              row: 1,
              order: 1,
              cols: 12
            },
            text: {
              description: "Texto a desplegar",
              title: "Texto",
              type: "string",
              default: "",
              row: 2,
              order: 1,
              cols: 12
            },
            param: {
              description: "parametro a desplegar",
              title: "Parametro",
              type: "string",
              default: "",
              row: 3,
              order: 1,
              cols: 12
            },
            x: {
              description: "Posición izquierda del texto",
              title: "X",
              type: "integer",
              default: 0,
              row: 4,
              order: 1,
              cols: 6
            },
            y: {
              description: "Posición superior del texto",
              title: "Y",
              type: "integer",
              default: 0,
              row: 4,
              order: 2,
              cols: 6
            },
            format: {
              description: "Formato de la etiqueta ",
              title: "Format",
              type: "string",
              default: "",
              row: 5,
              order: 1,
              cols: 12
            },
            width: {
              description: "Ancho de la etiqueta (default=2)",
              title: "Ancho",
              type: "integer",
              default: 2,
              row: 6,
              order: 1,
              cols: 6
            },
            height: {
              description: "Alto del la etiqueta (default=100)",
              title: "Alto",
              type: "integer",
              default: 100,
              row: 6,
              order: 2,
              cols: 6
            },
            displayValue: {
              description: "Desplegar valor de la etiqueta",
              title: "Alto",
              type: "boolean",
              default: true,
              row: 7,
              order: 1,
              cols: 6
            },
            font: {
              description:
                "Fuente utilizada para desplegar valor de la etiqueta",
              title: "Fuente",
              type: "string",
              default: "",
              row: 7,
              order: 2,
              cols: 6
            },
            textAlign: {
              description:
                "Alineamiento utilizado para desplegar valor de la etiqueta",
              title: "Posicion Horizontal",
              type: ["center", "left", "right"],
              default: "center",
              row: 8,
              order: 1,
              cols: 6
            },
            textPosition: {
              description:
                "Posición vertical utilizado para desplegar valor de la etiqueta",
              title: "Posición vertical",
              type: ["center", "left", "right"],
              default: "center",
              row: 8,
              order: 2,
              cols: 6
            },
            textMargin: {
              description:
                "Margen utilizado para desplegar valor de la etiqueta",
              title: "Margen",
              type: "integer",
              default: 0,
              row: 9,
              order: 1,
              cols: 6
            },
            fontSize: {
              description:
                "Tamaño de la fuente utilizada para desplegar valor de la etiqueta",
              title: "Tamaño de la la fuente",
              type: "integer",
              default: 0,
              row: 9,
              order: 2,
              cols: 6
            }
          },
          required: ["x", "y"]
        }
      }
    },
  },
  mutations: {},
  actions: {},
  modules: {}
});
