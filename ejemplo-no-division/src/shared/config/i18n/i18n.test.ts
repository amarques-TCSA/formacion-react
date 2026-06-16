import fs from 'fs';
import path from 'path';

type Traducciones = {
  [key: string]: Traducciones | string;
};

function obtenerClaves(obj: Traducciones): string[] {
  let claves: string[] = [];
  for (const clave in obj) {
    claves.push(clave);
    if (typeof obj[clave] === 'object' && obj[clave] !== null) {
      claves = claves.concat(obtenerClaves(obj[clave]));
    }
  }
  return claves;
}

function verificarExistenciaTraduccion(
  traducciones: Traducciones,
  idioma: string,
): boolean {
  for (const clave in traducciones) {
    const traduccion = traducciones[clave];
    if (typeof traduccion === 'string') {
      if (traduccion.includes('CA_') || traduccion.includes('EU_')) {
        console.warn(
          `##vso[task.logissue type=warning]WarningTranslations: La clave "${clave}" en el idioma "${idioma}" tiene una traducción pendiente: "${traduccion}".`,
        );
        return true;
      }
    } else if (typeof traduccion === 'object' && traduccion !== null) {
      if (verificarExistenciaTraduccion(traduccion, idioma)) {
        return true;
      }
    }
  }
  return false;
}

function cargarTraducciones(idioma: string) {
  const rutaArchivo = path.resolve(
    __dirname,
    `../../../../public/locales/${idioma}.json`,
  );
  const contenidoArchivo = fs.readFileSync(rutaArchivo, 'utf-8');
  return JSON.parse(contenidoArchivo);
}

describe('las claves de traducción i18n', () => {
  const languages = ['es', 'eu', 'ca'];

  it('deberian cargar correctamente los archivos de traduccion', () => {
    languages.forEach((lang) => {
      const translations = cargarTraducciones(lang);
      expect(translations).toBeDefined();
      expect(typeof translations).toBe('object');
    });
  });

  it('deberian existir las mismas en todos los archivos de traduccion', () => {
    const lenguajesConClaves: { [key: string]: Set<string> } = {};

    languages.forEach((lang) => {
      const translations = cargarTraducciones(lang);
      const claves = obtenerClaves(translations);
      lenguajesConClaves[lang] = new Set(claves);
    });

    const clavesPrimerLenguaje = lenguajesConClaves[languages[0]];
    languages.slice(1).forEach((lang) => {
      const clavesLenguajeActual = lenguajesConClaves[lang];
      expect(clavesLenguajeActual).toEqual(clavesPrimerLenguaje);
    });
  });

  it('deberian no tener traducciones pendientes', () => {
    languages.forEach((lang) => {
      const translations = cargarTraducciones(lang);
      verificarExistenciaTraduccion(translations, lang);
    });
  });
});
