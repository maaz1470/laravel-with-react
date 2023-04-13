<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Auth;
class ApiAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if(Auth::check()){
            if(auth()->user()->tokenCan('server:admin')){
                return $next($request);
            }else{
                return Response()->json([
                    'status'    => 403,
                    'message'   => 'Authentication Failed'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 401,
                'message'   => 'Please login first.'
            ]);
        }
        // return $next($request);
    }
}
