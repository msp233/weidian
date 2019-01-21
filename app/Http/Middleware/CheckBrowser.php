<?php

namespace App\Http\Middleware;

use Closure;

class CheckBrowser
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if(strpos($request->server('HTTP_USER_AGENT'),'MicroMessenger') !== false){
            //是微信浏览器登入
            return redirect('api/socials/authorizations');

        }
        return $next($request);
    }
}
