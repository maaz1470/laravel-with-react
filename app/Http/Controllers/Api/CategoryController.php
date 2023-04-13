<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
class CategoryController extends Controller
{
    public function add_category(Request $request){
        $validator = Validator::make($request->all(),[
            'slug'      => 'required|string|max:255|unique:categories,slug',
            'name'      => 'required|string|max:255'
        ]);
        if($validator->fails()){
            return Response()->json(['errors'=>$validator->errors()->all()],200);
        }

        $category = new Category();
        $category->name         = $request->name;
        $category->slug         = $request->slug;
        $category->description  = $request->description;
        $category->status       = $request->status ? 1 : 0;
        $category->meta_keywords= $request->meta_keywords;
        $category->meta_title   = $request->meta_title;
        $category->meta_description = $request->meta_description;
        if($category->save()){
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category insert successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 500,
                'message'   => 'Something went wrong. Please try again later.'
            ]);
        }
        
    }


    public function all_categories(){
        $categories = Category::all();
        return Response()->json([
            'status'    => 200,
            'categories'    => $categories
        ]);
    }

    public function getCategoryUsingId($id){
        $category = Category::find($id);
        if(!$category){
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category Not Found'
            ]);
        }else{
            return Response()->json([
                'status'    => 200,
                'category'  => $category
            ]);
        }
    }

    public function updateCategory(Request $request,$id){
        $validator = Validator::make($request->all(),[
            'slug'      => 'required|string|max:255',
            'name'      => 'required|string|max:255'
        ]);
        if($validator->fails()){
            return Response()->json(['errors'=>$validator->errors()->all(),'status' => 200]);
        }

        $category = Category::find($id);
        if($category){
            $category->name         = $request->name;
            $category->slug         = $request->slug;
            $category->description  = $request->description;
            $category->status       = $request->status ? 1 : 0;
            $category->meta_keywords= $request->meta_keywords;
            $category->meta_title   = $request->meta_title;
            $category->meta_description = $request->meta_description;
            if($category->update()){
                return Response()->json([
                    'status'    => 200,
                    'message'   => 'Category Update successfully'
                ]);
            }else{
                return Response()->json([
                    'status'    => 500,
                    'message'   => 'Something went wrong. Please try again later.'
                ]);
            }
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => '404 Not Found'
            ]);
        }
    }

    public function deleteCategory($id){
        $category = Category::find($id);
        if($category){
            $category->delete();
            return Response()->json([
                'status'    => 200,
                'message'   => 'Category Delete Successfully'
            ]);
        }else{
            return Response()->json([
                'status'    => 404,
                'message'   => 'Category Not Found'
            ]);
        }
    }

    public function getProductPageCategory(){
        $categories = Category::where('status',1)->get();
        return Response()->json([
            'status'    => 200,
            'categories'  => $categories
        ]);
    }
}
