<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMovieRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required',
            'title' => 'required',
            'image' => 'required|image|mimes:png,jpg,jpeg,gif',
            'trailer' => 'required|mimetypes:mimetypes:video/mp4,video/quicktime',
            'description' => 'required',
            'release_date' => 'required|date',
            'duration' => 'required|integer',
            'director_id' => 'required|integer'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Vui lòng nhập tên.',
            'title.required' => 'Vui lòng nhập tiêu đề.',
            'image.required' => 'Vui lòng chọn hình ảnh.',
            'image.image' => 'Hình ảnh phải là định dạng hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng PNG, JPG, JPEG hoặc GIF.',
            'trailer.required' => 'Vui lòng chọn video trailer.',
            'trailer.mimetypes' => 'Video trailer phải có định dạng MP4 hoặc QuickTime.',
            'description.required' => 'Vui lòng nhập mô tả.',
            'release_date.required' => 'Vui lòng chọn ngày phát hành.',
            'release_date.date' => 'Ngày phát hành không hợp lệ.',
            'duration.required' => 'Vui lòng nhập thời lượng.',
            'duration.integer' => 'Thời lượng phải là số nguyên.',
            'director_id.required' => 'Vui lòng chọn đạo diễn.',
            'director_id.integer' => 'Đạo diễn phải là số nguyên.',
        ];
    }
}
