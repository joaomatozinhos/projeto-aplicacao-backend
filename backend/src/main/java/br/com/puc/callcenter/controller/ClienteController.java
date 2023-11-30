package br.com.puc.callcenter.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.puc.callcenter.dto.PesquisaCliente;
import br.com.puc.callcenter.model.Cliente;
import br.com.puc.callcenter.repository.ClienteRepository;
import jakarta.transaction.Transactional;

@CrossOrigin
@RestController
@RequestMapping("clientes")
public class ClienteController {

	@Autowired
	private ClienteRepository repository;

	@PostMapping("/cadastrar")
	@Transactional
	public void cadastra(@RequestBody Cliente cliente) {
		repository.save(cliente);
	}

	@GetMapping("/buscarTodos")
	public List<Cliente> buscaTodos() {
		return repository.findAll();
	}

	@GetMapping("/buscar/{id}")
	public Optional<Cliente> buscaPorId(@PathVariable Long id) {
		return repository.findById(id);
	}

	@PutMapping("/editar")
	@Transactional
	public void atualiza(@RequestBody Cliente cliente) {
		Cliente clienteRecuperado = repository.getReferenceById(cliente.getId());
		clienteRecuperado.atualizaDados(cliente);
	}

	@DeleteMapping("/excluir/{id}")
	@Transactional
	public void exclui(@PathVariable Long id) {
		repository.deleteById(id);
	}

	@PostMapping("/pesquisar")
	@Transactional
	public List<Cliente> pesquisa(@RequestBody PesquisaCliente filter) {
		return repository.search(filter.getNome(), filter.getCpf(), filter.getUf(), filter.getCidade());
	}

}
