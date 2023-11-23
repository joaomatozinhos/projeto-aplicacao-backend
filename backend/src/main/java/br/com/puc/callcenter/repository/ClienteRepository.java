package br.com.puc.callcenter.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.puc.callcenter.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}
