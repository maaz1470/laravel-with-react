<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Hash;
use Auth;
class AuthController extends Controller
{
    public function registration(Request $request){
        $validator = Validator::make($request->all(),[
            'firstName'     => 'required|string|max:255',
            'lastName'      => 'required|string|max:255',
            'email'         => 'required|email|max:255|unique:users,email',
            'password'      => 'required|max:255'
        ],[
            'email.unique'  => 'The user allready exist.'
        ]);

        if($validator->fails()){
            return Response()->json(['errors'=>$validator->errors()->all()]);
        }

        $user = new User();
        $user->first_name = $request->firstName;
        $user->last_name = $request->lastName;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        if($user->save()){
            $token = $user->createToken($user->email . '_token')->plainTextToken;
            return Response()->json([
                'status'    => 200,
                'success'   => 'Registration Successfully',
                'token'     => $token
            ]);
        }else{
            return Response()->json(['error'=>'Something went wrong. Please try again.']);
        }
    }

    public function login_storage(Request $request){
        $validator = Validator::make($request->all(),[
            'email'     => 'required|string|max:255',
            'password'  => 'required|max:255'
        ]);

        if($validator->fails()){
            return Response()->json(['errors'=>$validator->errors()->all()]);
        }

        $user = User::where('email',$request->email)->get()->first();
        if(!$user || !Hash::check($request->password, $user->password)){
            return Response()->json([
                'status'    => 403,
                'message'   => 'Login Failed'
            ]);
        }else{
            if($user->role == 1){
                $token = $user->createToken($user->email . '_token',['server:admin'])->plainTextToken;
            }elseif($user->role == 0){
                $token = $user->createToken($user->email . '_token',[''])->plainTextToken;
            }
            return Response()->json([
                'status'    => 200,
                'token'     => $token,
                'message'   => 'Login Successfully',
                'username'  => $user->first_name . ' ' . $user->last_name
            ]);
        }

    }

    public function logout(Request $request){
        if(auth()->user()->tokens()->delete()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Logout Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 403,
                'message'   => 'Something went wrong. Please try again.'
            ]);
        }
    }
}
