<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StateRequest extends FormRequest
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
            'client_id' => 'required',
            'short_description' => 'required|string|max:150',
            'situation' => 'required',
            'avaliable' => 'required',
            'street' => 'required|string|max:55',
            'neighbor' => 'required|string|max:55',
            'city' => 'required|string|max:55',
            'cep' => 'required|string|max:9',
            'state_number' => 'numeric',
            'images' => 'required',
            'long_description' => 'string',
        ];
    }
    public function messages()
    {
        return [
            'client_id.required' => 'O campo proprietário deve ser selecionado',
            'short_description.required' => 'O Campo descrição curta deve ser preenchido',
            'short_description.string' => 'O Campo descrição curta deve ser caracteres',
            'short_description.max' => 'O Campo descrição curta deve terno máximo 55 caracters',
            'situation.required' => 'O campo situação do imóvel deve ser selecionada',
            'avaliable.required' => 'O campo disponibilidade do imóvel deve ser selecionada',
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
            'images.required' => 'O Campo imagem deve ser preenchido',
            'cep.string' => 'O Campo cep deve ser caracteres',
            'cep.max' => 'O Campo cep deve terno máximo 9 caracters',
            'state_number.numeric' => 'O Campo número deve ter apenas numeros',
            'long_description.string' => 'O Campo descrição deve conter apenas caracteres!',
        ];
    }
}
