package br.com.puc.callcenter.model;

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
}
