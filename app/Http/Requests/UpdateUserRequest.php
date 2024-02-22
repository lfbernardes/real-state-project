<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email,'.$this->id,
            'password' => [
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols(),
            ]
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'O campo nome deve ser preenchido',
            'name.string' => 'Preencha corretamente o campo nome',
            'name.max' => 'O campo nome conter até 55 caracteres',
            'email.required' => 'O Campo email deve ser preenchido',
            'email.email' => 'Insira um email válido',
            'email.unique' => 'Esse email já existe',
            'password.confirmed' => 'O campo senha deve ser confirmado'
        ];
    }
}
