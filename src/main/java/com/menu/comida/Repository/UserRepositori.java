package com.menu.comida.Repository;

import com.menu.comida.models.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepositori  extends CrudRepository<User,Integer> {
    Optional<User> findAllById(Integer id);

    @Query("SELECT c FROM User c WHERE c.email = :email AND c.password = :password")
    List<User> findByEmailOrAddress(@Param("email") String email, @Param("password") String password);

}
