package edu.crypto.data.user.domain;

import edu.crypto.data.role.domain.Role;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "crypto_user")
@NoArgsConstructor
public class CryptoUser {

    @Id
    @Column(name = "user_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "username", nullable = false)
    @NotEmpty
    private String username;

    @Column(name = "email", nullable = false)
    @Email
    private String email;

    @Column(name = "password", nullable = false)
    @NotEmpty
    private String password;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @JoinTable(
            name = "crytouser_role",
            joinColumns = @JoinColumn(name = "cryptouser_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private Set<Role> roles = new HashSet<>();

    public void addRoles(Set<Role> roles) {
        roles.forEach(this::addRole);
    }

    public void addRole(Role role) {
        getRoles().add(role);
        role.getCryptoUsers().add(this);
    }
}
