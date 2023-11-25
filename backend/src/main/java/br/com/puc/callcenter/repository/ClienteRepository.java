package br.com.puc.callcenter.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import br.com.puc.callcenter.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	@Query("""
				select c from Cliente c
				where c.nome like concat('%',:nome,'%')
				and c.cpf like concat('%',:cpf,'%')
				and c.endereco.uf like concat('%',:uf,'%')
				and c.endereco.cidade like concat('%',:cidade,'%')
			""")
	List<Cliente> search(String nome, String cpf, String uf, String cidade);
}
