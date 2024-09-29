import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Import router

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule], // Add RouterModule for routing
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
}