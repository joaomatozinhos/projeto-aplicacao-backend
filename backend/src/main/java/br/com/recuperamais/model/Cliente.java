package br.com.recuperamais.model;

import java.sql.Date;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "clientes")
public class Cliente {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	private String nome;
	private String cpf;
	private String email;
	private String telefone;
	private Date dataNascimento;

	@Embedded
	private Endereco endereco;

	public Cliente() {
	}

	public Long getId() {
		return id;
	}

	public String getNome() {
		return nome;
	}

	public String getCpf() {
		return cpf;
	}

	public String getEmail() {
		return email;
	}

	public String getTelefone() {
		return telefone;
	}

	public Date getDataNascimento() {
		return dataNascimento;
	}

	public Endereco getEndereco() {
		return endereco;
	}

	public void atualizaDados(Cliente cliente) {
		if (cliente.getNome() != null) {
			this.nome = cliente.getNome();
		}

		if (cliente.getCpf() != null) {
			this.cpf = cliente.getCpf();
		}

		if (cliente.getEmail() != null) {
			this.email = cliente.getEmail();
		}

		if (cliente.getTelefone() != null) {
			this.telefone = cliente.getTelefone();
		}

		if (cliente.getDataNascimento() != null) {
			this.dataNascimento = cliente.getDataNascimento();
		}

		if (cliente.getEndereco() != null) {
			this.endereco.atualizarDados(cliente.getEndereco());
		}
	}
}
