# Seismocore-Listen to Mars' heartbeat like never before

Seismocore is a dual-component project that includes a research platform and a collection of Jupyter notebooks for analyzing Martian seismic data. The project combines a polished front-end interface with powerful back-end data analysis capabilities.

## 💻 Technical Notebooks

The computational core of Seismocore is a set of four Jupyter notebooks that perform various data analysis and machine learning tasks on seismic data from Mars.

### `Signal_processing.ipynb`

This notebook focuses on the preprocessing and analysis of time-series seismic data. It uses the `Obspy` library to load and filter raw `.mseed` files, removing noise and instrumental errors. Key techniques include Fourier transforms for frequency analysis and wavelet transforms for understanding signal behavior over time. The notebook also generates synthetic waveforms and applies **Logistic Regression** to classify seismic events into "shadow zones" or "non-shadow zones."

### `Core_radius.ipynb`

This notebook is dedicated to determining the Martian core radius. It models the internal structure of Mars by simulating P-wave and S-wave velocities and density as a function of depth. The notebook uses pre-existing datasets for comparison and applies **Random Forest** algorithms to predict the optimal core radius.

### `DBSCAN_anomaly.ipynb`

This notebook uses the **DBSCAN** (Density-Based Spatial Clustering of Applications with Noise) algorithm to detect anomalies in seismic waveforms. It preprocesses waveform data by separating amplitude, frequency, and phase components. The algorithm's parameters (`eps` and `min_samples`) are tuned to optimize clustering, and anomalies are visualized for further analysis of potential geological features.

### `PINN.ipynb`

This notebook implements a **Physics-Informed Neural Network (PINN)** to solve the partial differential equations (PDEs) of seismic waves. It uses a Gaussian Process Neural Network (GPNN) that incorporates physical laws directly into its loss function. This allows the model to learn and map the behavior of P and S waves as a function of depth, and the results are validated against known solutions.

## 🖥️ React-Based Front-End

The user-facing component of Seismocore is a modern web platform built with React. It provides an engaging and responsive interface for users to explore the project's research.

### Key Features

* **Aesthetic Design**: The platform features a striking black background with rusty-orange accents (`#D36427`) and glass-morphism cards to create a distinct Mars-themed look.
* **Intuitive Navigation**: A persistent sidebar allows easy access to different sections, including Home, Dashboard, and Contributions.
* **Interactive Content**: The homepage includes a full-bleed Mars landscape with a parallax starfield effect and a dynamic display of random Mars facts.
* **Research Dashboard**: The dashboard provides an overview of project data, including article summaries, recent activity, and simple CSS bar charts for data visualization.
* **Contribution System**: Users can submit contributions via a local form with validation and persistence using `localStorage`.

### Technology Stack

* **Frontend**: React 18, TypeScript, Vite
* **Styling**: Tailwind CSS with a custom design system
* **Routing**: React Router DOM
* **Fonts**: Orbitron (display) and JetBrains Mono (body)

### Future Integration

The front-end is designed for easy backend integration. Future plans include replacing `localStorage` with API calls for form submissions and real-time statistics, as well as implementing user authentication and connecting to external Mars data APIs.
