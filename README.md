# 📡 TelecoManager

**Sistema de Gestión de Servicios de Telecomunicaciones B2B**

Una plataforma moderna desarrollada en Angular 20 y Firebase que permite a empresas de telecomunicaciones gestionar servicios corporativos (internet dedicado, telefonía IP, hosting) mientras que sus clientes empresariales pueden autogestionar sus servicios de forma intuitiva.

## 🚀 Características Principales

### Para Empresas de Telecomunicaciones (Admin)

- 📊 Dashboard con métricas en tiempo real
- 🏢 Gestión completa de clientes empresariales
- 🌐 Catálogo configurable de servicios
- 📈 Monitor de servicios activos y SLAs
- 💰 Sistema de facturación automática

### Para Clientes Empresariales

- 🎛️ Portal de autoservicio
- 📋 Visualización de servicios contratados
- 🛒 Solicitud de nuevos servicios
- 🧾 Historial de facturas y pagos
- ⚡ Monitoreo en tiempo real de servicios

## 🛠️ Stack Tecnológico

### Frontend

- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje de desarrollo
- **TailwindCSS** - Framework de estilos
- **Headless UI Angular** - Componentes accesibles
- **Heroicons** - Sistema de iconografía
- **RxJS** - Programación reactiva
- **Chart.js** - Visualización de datos

### Backend & Cloud

- **Firebase Authentication** - Sistema de autenticación
- **Firebase Firestore** - Base de datos NoSQL
- **Firebase Functions** - Funciones serverless
- **Firebase Storage** - Almacenamiento de archivos
- **Firebase Hosting** - Deploy y CDN

### Servicios Externos

- **Stripe Billing** - Procesamiento de pagos B2B
- **Google Analytics 4** - Analytics y métricas

## 📋 Requisitos Previos

- **Node.js** >= 18.x
- **npm** >= 9.x
- **Angular CLI** >= 20.x
- **Cuenta de Firebase** con proyecto creado
- **Cuenta de Stripe** (para facturación)

## 🔧 Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/telecom-manager.git
cd telecom-manager
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Firebase

#### 3.1 Crear proyecto en Firebase Console

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Crea un nuevo proyecto
3. Habilita Authentication, Firestore y Functions

#### 3.2 Configurar Authentication

```bash
# En Firebase Console, ve a Authentication > Sign-in method
# Habilita Email/Password y Google
```

#### 3.3 Configurar Firestore

```bash
# En Firebase Console, ve a Firestore Database
# Crea la base de datos en modo test inicialmente
```

#### 3.4 Obtener configuración

```bash
# En Firebase Console, ve a Project Settings > General
# En "Your apps", agrega una nueva app web
# Copia la configuración generada
```

### 4. Variables de Entorno

#### 4.1 Configuración de Firebase

Crea el archivo `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: "tu-api-key",
    authDomain: "tu-proyecto.firebaseapp.com",
    projectId: "tu-proyecto-id",
    storageBucket: "tu-proyecto.appspot.com",
    messagingSenderId: "123456789",
    appId: "tu-app-id",
  },
  stripe: {
    publishableKey: "pk_test_...",
  },
};
```

#### 4.2 Configuración de Producción

Crea el archivo `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  firebase: {
    // Configuración de producción
  },
  stripe: {
    publishableKey: "pk_live_...",
  },
};
```

### 5. Configurar Firebase Functions

#### 5.1 Instalar Firebase CLI

```bash
npm install -g firebase-tools
firebase login
```

#### 5.2 Inicializar Functions

```bash
firebase init functions
# Selecciona TypeScript
# Instala dependencias
```

#### 5.3 Configurar Variables de Functions

```bash
firebase functions:config:set stripe.secret_key="sk_test_..."
firebase functions:config:set stripe.webhook_secret="whsec_..."
```

### 6. Reglas de Seguridad de Firestore

Actualiza las reglas en Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Usuarios autenticados pueden leer/escribir sus datos
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Empresas - solo usuarios de la misma empresa
    match /companies/{companyId} {
      allow read, write: if request.auth != null &&
        request.auth.token.companyId == companyId;
    }

    // Servicios - basado en permisos de empresa
    match /services/{serviceId} {
      allow read, write: if request.auth != null &&
        request.auth.token.companyId == resource.data.companyId;
    }
  }
}
```

## 🚀 Ejecución

### Desarrollo

```bash
# Servidor de desarrollo
ng serve

# Con configuración específica
ng serve --configuration development

# La aplicación estará disponible en http://localhost:4200
```

### Build

```bash
# Build de desarrollo
ng build

# Build de producción
ng build --configuration production
```

### Testing

```bash
# Tests unitarios
ng test

# Tests e2e
ng e2e

# Coverage
ng test --code-coverage
```

## 🚢 Deploy

### Deploy en Firebase Hosting

```bash
# Build de producción
ng build --configuration production

# Deploy
firebase deploy --only hosting

# Deploy completo (hosting + functions)
firebase deploy
```

### Variables de Entorno en Producción

```bash
# Configurar variables para functions
firebase functions:config:set stripe.secret_key="sk_live_..."
firebase functions:config:set app.domain="tudominio.com"
```

## 📁 Estructura del Proyecto

```
src/
├── app/
│   ├── core/                    # Servicios singleton y guards
│   ├── shared/                  # Componentes compartidos
│   ├── features/                # Módulos por funcionalidad
│   │   ├── auth/               # Autenticación
│   │   ├── dashboard/          # Dashboards
│   │   ├── companies/          # Gestión de empresas
│   │   ├── services/           # Gestión de servicios
│   │   └── billing/            # Facturación
│   ├── data/                   # Capa de acceso a datos
│   └── layout/                 # Layouts de la aplicación
├── assets/                     # Recursos estáticos
├── environments/               # Configuraciones de entorno
└── functions/                  # Firebase Functions
```

## 🔒 Configuración de Seguridad

### Firebase Security Rules

- Configurar reglas restrictivas en Firestore
- Validar tokens de autenticación
- Implementar roles y permisos

### Variables Sensibles

- Nunca commitear API keys en el código
- Usar variables de entorno para configuraciones
- Rotar claves regularmente

## 📚 Scripts Disponibles

```bash
# Desarrollo
npm run start              # ng serve
npm run build              # ng build
npm run test               # ng test
npm run lint               # ng lint

# Firebase
npm run deploy             # firebase deploy
npm run functions:serve    # firebase emulators:start --only functions
npm run functions:deploy   # firebase deploy --only functions

# Utilidades
npm run format             # prettier --write
npm run analyze            # webpack-bundle-analyzer
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 🐛 Reporte de Bugs

Si encuentras un bug, por favor crea un issue en GitHub con:

- Descripción detallada del problema
- Pasos para reproducir
- Capturas de pantalla si es necesario
- Información del entorno (OS, browser, versión)

## 📞 Soporte

- **Documentación**: [Wiki del proyecto](https://github.com/tu-usuario/telecom-manager/wiki)
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/telecom-manager/issues)
- **Discusiones**: [GitHub Discussions](https://github.com/tu-usuario/telecom-manager/discussions)

---

**Desarrollado con ❤️ usando Angular 20 y Firebase**
