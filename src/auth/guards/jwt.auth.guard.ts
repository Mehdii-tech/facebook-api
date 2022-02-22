import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
	public constructor( private readonly reflector: Reflector ) {
		super();
	}

	public canActivate( context: ExecutionContext ){
		const isPublic = this.reflector.get<boolean>( "isPublic", context.getHandler() );
		if ( isPublic ) {
			return true;
		}

		return super.canActivate(context);
	}
}

// Va activer le guard si il ne trouve pas le tag Public (si isPublic === undefined)
