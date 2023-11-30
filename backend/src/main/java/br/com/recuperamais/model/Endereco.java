package br.com.recuperamais.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Endereco {

	private String cep;
	private String logradouro;
	private String bairro;
	private String numero;
	private String complemento;
	private String cidade;
	private String uf;

	public Endereco() {
	}

	public String getCep() {
		return cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public String getBairro() {
		return bairro;
	}

	public String getNumero() {
		return numero;
	}

	public String getComplemento() {
		return complemento;
	}

	public String getCidade() {
		return cidade;
	}

	public String getUf() {
		return uf;
	}

	public void atualizarDados(Endereco endereco) {
		if (endereco.getCep() != null) {
			this.cep = endereco.getCep();
		}

		if (endereco.getLogradouro() != null) {
			this.logradouro = endereco.getLogradouro();
		}

		if (endereco.getBairro() != null) {
			this.bairro = endereco.getBairro();
		}

		if (endereco.getUf() != null) {
			this.uf = endereco.getUf();
		}

		if (endereco.getCidade() != null) {
			this.cidade = endereco.getCidade();
		}

		if (endereco.getNumero() != null) {
			this.numero = endereco.getNumero();
		}

		if (endereco.getComplemento() != null) {
			this.complemento = endereco.getComplemento();
		}
	}
}
