import { useState } from 'react';

export function DeletarPersonagem() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(inputs);
        let headersList = {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        let bodyContent = "nome=" + inputs.nome + "&descricao=" + inputs.descricao + "&idMestre=" + inputs.idMestre + "&status=" + inputs.status;
        let response = await fetch(`http://localhost:9000/personagem/${inputs.id}`, {
            method: "DELETE",
            headers: headersList,
            body: bodyContent,
        }).then(response => {
            console.log(response);
            return response.json();
        })

        let data = await response.text();
        console.log(data);
    }

    return (
        <div><h3>Deletar Personagem</h3>
            <form onSubmit={handleSubmit}>
                <label>ID:<br />
                    <input
                        type="number"
                        name="id"
                        value={inputs.id || ""}
                        onChange={handleChange}
                    />
                </label>
                <input type="submit" value="Deletar" />
            </form>
        </div>
    )
}