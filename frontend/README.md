# Auth Practice - Todo List Application

A modern React 19 Next.js 15 application with PostgreSQL integration, deployed on Kubernetes with Istio service mesh.

## Features

### ✅ **Full CRUD Operations**
- **Create**: Add new todos with title and description
- **Read**: View all todos with filtering (All/Active/Completed)
- **Update**: Edit todo details and toggle completion status
- **Delete**: Remove todos with confirmation dialog

### ✅ **Enhanced User Experience**
- **Real-time feedback**: Success and error notifications
- **Loading states**: Visual feedback during operations
- **Form validation**: Input validation with helpful error messages
- **Confirmation dialogs**: Safe delete operations
- **Responsive design**: Works on desktop and mobile
- **Dark mode support**: Built with shadcn/ui components

### ✅ **Database Integration**
- **PostgreSQL**: Persistent data storage
- **Automatic schema initialization**: Database tables created on startup
- **Connection pooling**: Efficient database connections
- **Error handling**: Graceful fallbacks for database issues

### ✅ **Infrastructure**
- **Kubernetes deployment**: Containerized application
- **Istio service mesh**: Advanced traffic management
- **HTTPS support**: Secure communication with TLS
- **Health checks**: Application and database monitoring
- **Network policies**: Secure inter-service communication

## Technology Stack

- **Frontend**: React 19, Next.js 15, TypeScript
- **UI Components**: shadcn/ui, Tailwind CSS
- **Database**: PostgreSQL 17.5
- **Container**: Docker
- **Orchestration**: Kubernetes (k3d)
- **Service Mesh**: Istio
- **Package Manager**: pnpm

## Quick Start

### Access the Application

1. **Via Istio Ingress Gateway**:
   - HTTPS: `https://authpractice.local:8443`
   - HTTP (redirects to HTTPS): `http://authpractice.local:8080`

2. **Direct Access** (for testing):
   - `http://localhost:3000`

### API Endpoints

- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

### Database Schema

```sql
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Prerequisites
- Node.js 18+
- pnpm
- Docker
- Kubernetes cluster (k3d recommended)

### Local Development
```bash
cd frontend
pnpm install
pnpm dev
```

### Database Connection
The application automatically connects to PostgreSQL using environment variables:
- `POSTGRES_HOST`: Database host (default: postgresql.postgresql.svc.cluster.local)
- `POSTGRES_PORT`: Database port (default: 5432)
- `POSTGRES_DB`: Database name (default: authpractice)
- `POSTGRES_USER`: Database user (default: postgres)
- `POSTGRES_PASSWORD`: Database password (default: postgres123)

## Deployment

The application is deployed using:
- **Helm charts** for Kubernetes deployment
- **ArgoCD** for GitOps continuous deployment
- **Istio** for service mesh and ingress management
- **Cert-manager** for SSL certificate management

## Recent Improvements

### Frontend Enhancements
- ✅ Added success notifications for all CRUD operations
- ✅ Improved error handling with detailed error messages
- ✅ Added confirmation dialogs for delete operations
- ✅ Enhanced form validation with real-time feedback
- ✅ Added loading states and disabled states during operations
- ✅ Improved empty states and filter messaging
- ✅ Added character counters for input fields

### Backend Stability
- ✅ Fixed database connection issues
- ✅ Resolved NetworkPolicy restrictions
- ✅ Improved error handling and logging
- ✅ Added proper HTTP status codes

### Infrastructure
- ✅ Configured Istio ingress gateway
- ✅ Set up HTTPS with self-signed certificates
- ✅ Implemented proper port forwarding
- ✅ Added host resolution for local development

## Status

🎉 **Application Status: FULLY OPERATIONAL**

- ✅ Backend API: Working perfectly
- ✅ Database: Connected and functional
- ✅ Frontend: Enhanced with improved UX
- ✅ Istio Gateway: Properly configured
- ✅ CRUD Operations: All tested and working
- ✅ Error Handling: Comprehensive and user-friendly
