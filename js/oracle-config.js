/**
 * ─────────────────────────────────────────────────────────────────
 *  CONFIGURACIÓN DE ORACLE CLOUD OBJECT STORAGE — Super Aventureros RD
 * ─────────────────────────────────────────────────────────────────
 *
 *  Reemplaza firebase-config.js completamente.
 *  Usa Oracle Object Storage (Free Tier — 20 GB gratis permanente).
 *
 *  PAR_URL: Pre-Authenticated Request con permisos de lectura/escritura.
 *  BUCKET_PUBLIC_URL: URL pública del bucket (visibilidad Public).
 *
 *  ── Modo local / pruebas ──────────────────────────────────────
 *  Si el sitio se abre desde localhost, 127.0.0.1 o directamente
 *  como archivo (file://), NO se conecta al bucket real de Oracle:
 *  todo funciona solo con localStorage del navegador. Así puedes
 *  probar catálogo, reservas y pagos sin tocar los datos en
 *  producción. Al subir el sitio a tu dominio real, se reconecta
 *  automáticamente al bucket.
 * ─────────────────────────────────────────────────────────────────
 */
(function () {
  var host = (typeof location !== 'undefined' ? location.hostname : '') || '';
  var isLocal = location.protocol === 'file:' ||
                host === 'localhost' ||
                host === '127.0.0.1' ||
                host === '' ||
                host.endsWith('.local');

  if (isLocal) {
    // Sin configuración de Oracle: todo el sitio (catálogo, admin,
    // reservas) trabaja 100% con localStorage del navegador.
    window.__ORACLE_CONFIG__ = null;
    console.log('[oracle-config] Entorno local detectado — Oracle Object Storage DESACTIVADO. Usando solo localStorage.');
    return;
  }

  window.__ORACLE_CONFIG__ = {
    // URL del Pre-Authenticated Request (PAR) — permite leer Y escribir
    PAR_URL: 'https://objectstorage.us-ashburn-1.oraclecloud.com/p/kaNGxHZYE1JYNWbBz2IYYvbcmqnInoplZCz4RlhwgDMQqJ1lq77_DvLYmtFyP1uh/n/idmibqnm89k8/b/bucket-20260825-1800/o/',

    // URL pública base del bucket (para leer imágenes sin autenticación)
    BUCKET_PUBLIC_URL: 'https://objectstorage.us-ashburn-1.oraclecloud.com/n/idmibqnm89k8/b/bucket-20260825-1800/o/',

    // Nombre del archivo JSON que actúa como base de datos
    DB_FILE: 'catalog.json',

    // Carpeta donde se guardan las fotos
    PHOTOS_FOLDER: 'fotos/',

    // Intervalo de polling en milisegundos (cada 15 seg sincroniza con el servidor)
    // Equivale al "tiempo real" de Firebase pero sin costo
    POLL_INTERVAL_MS: 15000
  };
})();

