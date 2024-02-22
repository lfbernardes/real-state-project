<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ClientsRequest extends FormRequest
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
            'id' => 'required',
            'name' => 'required',
            'email' => 'required|email',
            'cpf' => 'required|max:11',
            'rg' => 'required|max:10',
            'contact' => 'required|max:11',
            'street' => 'required|string|max:55',
            'neighbor' => 'required|string|max:55',
            'city' => 'required|string|max:55',
            'cep' => 'required|string|max:9',
            'number' => 'required|numeric'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Preencha o campo nome.',
            'email.required' => 'Preencha o campo e-mail.',
            'email.required' => 'O campo e-mail deve conter um e-mail válido.',
            'cpf.required' => 'O Campo CPF deve ser preenchido.',
            'cpf.max' => 'O Campo CPF deve conter 11 caracteres, sem espaços, pontos eu traços.',
            'rg.required' => 'O campo RG deve ser preenchido.',
            'rg.max' => 'O campo RG deve conter 10 caracteres, sem espaços, pontos eu traços.',
            'contact.required' => 'O campo celular deve ser preenchido.',
            'contact.max' => 'O campo celular deve conter 11 numeros incluindo (DD)911112222.',
            'street.required' => 'O Campo rua deve ser preenchido',
            'street.string' => 'O Campo rua deve ser caracteres',
            'street.max' => 'O Campo rua deve terno máximo 55 caracters',
            'neighbor.required' => 'O Campo bairro deve ser preenchido',
            'neighbor.string' => 'O Campo bairro deve ser caracteres',
            'neighbor.max' => 'O Campo bairro deve terno máximo 55 caracters',
            'city.required' => 'O Campo cidade deve ser preenchido',
            'city.string' => 'O Campo cidade deve ser caracteres',
            'city.max' => 'O Campo cidade deve terno máximo 55 caracters',
            'cep.required' => 'O Campo cep deve ser preenchido',
            'cep.string' => 'O Campo cep deve ser caracteres',
            'cep.max' => 'O Campo cep deve terno máximo 9 caracters',
            'number.required' => 'O Campo número deve ser preenchido.',
            'number.numeric' => 'O Campo número deve ter apenas numeros'
        ];
    }
}
