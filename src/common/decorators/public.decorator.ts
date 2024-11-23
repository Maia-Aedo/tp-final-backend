import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../keys/public.key'

// Decorador para marcar rutas publicas agregando metadatos
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

