# TaskManager Frontend

Frontend completo con React y TypeScript para gestión de tareas, desarrollado como parte del parcial 2.

## 🚀 Características

### Stack Tecnológico
- **React 18+** con TypeScript
- **React Router DOM** para routing
- **Context API** para gestión de estado
- **Axios** para llamadas HTTP
- **Tailwind CSS** para estilos
- **React Hook Form** para formularios
- **React Hot Toast** para notificaciones

### Funcionalidades Implementadas

#### Autenticación
- ✅ Página de Login (`/login`) con formulario
- ✅ Página de Registro (`/register`) con formulario
- ✅ Almacenamiento del token JWT en localStorage
- ✅ Redirección automática a `/tasks` después de login exitoso
- ✅ Cerrar sesión (logout) que elimine el token
- ✅ Protección de rutas con redirección automática

#### Gestión de Tareas
- ✅ Página principal `/tasks` (protegida)
- ✅ Formulario para crear nuevas tareas
- ✅ Lista de tareas con opciones para:
  - Marcar como completada/no completada (toggle)
  - Editar tarea (modal)
  - Eliminar tarea con confirmación
- ✅ Filtros para mostrar: todas, completadas, pendientes
- ✅ Estados de carga durante las operaciones
- ✅ Actualización optimista de la UI

#### Interfaz de Usuario
- ✅ Diseño responsivo (móviles y desktop)
- ✅ Mensajes de error y éxito con toast notifications
- ✅ Estados vacíos cuando no hay tareas
- ✅ Loading states durante las peticiones
- ✅ Paleta de colores atractiva y consistente

#### Integración con API
- ✅ Interceptor de axios para agregar token automáticamente
- ✅ Manejo de errores de API (401, 404, 500, etc.)
- ✅ Actualización optimista de la UI
- ✅ Manejo de timeouts y errores de red

#### TypeScript
- ✅ Tipos definidos para User, Task, AuthResponse, etc.
- ✅ Props de componentes tipadas
- ✅ Funciones y hooks tipados

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── tasks/
│   │   ├── TaskList.tsx
│   │   ├── TaskItem.tsx
│   │   ├── TaskForm.tsx
│   │   └── TaskFilter.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ProtectedRoute.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── Input.tsx
│       ├── Modal.tsx
│       └── LoadingSpinner.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── TasksPage.tsx
├── context/
│   ├── AuthContext.tsx
│   └── TaskContext.tsx
├── services/
│   ├── api.ts
│   ├── authService.ts
│   └── taskService.ts
├── hooks/
│   ├── useAuth.ts
│   └── useTasks.ts
├── types/
│   └── index.ts
├── utils/
│   └── constants.ts
└── App.tsx
```

## ⚙️ Configuración

### Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
```

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build

# Preview de la build de producción
npm run preview
```

## 🌐 Rutas de la Aplicación

- `/login` - Página de inicio de sesión
- `/register` - Página de registro
- `/tasks` - Página principal de gestión de tareas (protegida)
- `/` - Redirección automática a `/tasks`

## 📱 Uso de la Aplicación

### 1. Registro/Login
1. Accede a `http://localhost:5173`
2. Regístrate o inicia sesión
3. Serás redirigido automáticamente a la página de tareas

### 2. Gestión de Tareas
1. **Crear tarea**: Haz clic en "Nueva Tarea"
2. **Marcar como completada**: Haz clic en el checkbox
3. **Editar tarea**: Haz clic en el ícono de editar
4. **Eliminar tarea**: Haz clic en el ícono de eliminar (con confirmación)
5. **Filtrar tareas**: Usa los botones de filtro (Todas, Completadas, Pendientes)

### 3. Características Responsivas
- **Desktop**: Diseño completo con todas las características
- **Tablet**: Adaptación del layout para pantallas medianas
- **Móvil**: Interface optimizada para pantallas pequeñas

## 🔧 API Integration

La aplicación está configurada para consumir un API REST con los siguientes endpoints:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/register` - Registrarse
- `GET /api/auth/profile` - Obtener perfil del usuario

### Tareas
- `GET /api/tasks` - Obtener todas las tareas
- `POST /api/tasks` - Crear nueva tarea
- `PUT /api/tasks/:id` - Actualizar tarea
- `DELETE /api/tasks/:id` - Eliminar tarea

## 🎨 Diseño y UX

### Colores
- **Primary**: Azul (#3B82F6)
- **Secondary**: Gris (#6B7280)
- **Success**: Verde (#059669)
- **Error**: Rojo (#DC2626)

### Componentes UI
- Botones con states (loading, disabled)
- Inputs con validación y estados de error
- Modal para formularios
- Toast notifications
- Loading spinners
- Estados vacíos

## 🔒 Seguridad

- Tokens JWT almacenados en localStorage
- Interceptors de Axios para autenticación automática
- Protección de rutas sensibles
- Manejo seguro de errores sin exponer información sensible

## 📝 Validaciones

### Formularios de Autenticación
- Email válido requerido
- Contraseña mínima de 6 caracteres
- Confirmación de contraseña (registro)
- Nombre requerido (registro)

### Formularios de Tareas
- Título requerido (máximo 100 caracteres)
- Descripción opcional (máximo 500 caracteres)

## 🚀 Desarrollo

### Scripts Disponibles
- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview de build
- `npm run lint` - Linting del código

### Estructura de Componentes
- Componentes funcionales con hooks
- Context API para estado global
- Custom hooks para lógica reutilizable
- Separación clara de responsabilidades

## 📊 Estado de Completitud

✅ **100% Completado** - Todas las funcionalidades requeridas están implementadas y funcionando.

### Criterios de Evaluación Cumplidos
- ✅ Páginas de login y registro funcionales
- ✅ Protección de ruta /tasks con redirección
- ✅ Formulario para crear tareas
- ✅ Lista de tareas con toggle done/undone
- ✅ Funcionalidad de eliminar tareas
- ✅ Diseño responsivo y atractivo
- ✅ Manejo de estados de carga y error
- ✅ Integración completa con API
- ✅ Vista móvil funcional
