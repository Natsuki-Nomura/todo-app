package com.example.demo.controller;

import com.example.demo.entity.Todo;
import com.example.demo.service.ToDoService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(
        origins = "http://localhost:5173/",
        allowCredentials = "true"
)

public class ToDoController {

    private final ToDoService todoService;

    public ToDoController(ToDoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getAllTodos(Principal principal) {
        return todoService.findAll(principal.getName());
    }

    @PostMapping
    public Todo createTodo(
            @RequestBody Todo todo,
            Principal principal) {
        return todoService.save(todo, principal.getName());
    }

    @PutMapping("/{id}")
    public Todo updateTodo(
            @PathVariable Long id,
            @RequestBody Todo todo,
            Principal principal) {
        return todoService.update(id, todo, principal.getName());
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(
            @PathVariable Long id,
            Principal principal) {
        todoService.deleteById(id, principal.getName());
    }
}
