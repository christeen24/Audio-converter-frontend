import { React } from "react";

export default function Header(props) {
  return (
    <div class="container-fluid">
      <nav class="navbar navbar-expand-md navbar-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Audio Converter
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-md-auto gap-2">
              <li class="nav-item dropdown rounded">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i class="bi bi-person-fill me-2"></i>Profile
                </a>
                <div
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                    <a class="dropdown-item" href="#">
                      Account
                    </a>
                    <hr class="dropdown-divider" />
                  <li>
                    <a class="dropdown-item" href="#">
                      Logout
                    </a>
                  </li>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
