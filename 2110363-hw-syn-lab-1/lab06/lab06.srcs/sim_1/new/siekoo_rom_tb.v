`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/22/2024 01:09:55 PM
// Design Name: 
// Module Name: siekoo_rom_tb
// Project Name: 
// Target Devices: 
// Tool Versions: 
// Description: 
// 
// Dependencies: 
// 
// Revision:
// Revision 0.01 - File Created
// Additional Comments:
// 
//////////////////////////////////////////////////////////////////////////////////


module siekoo_rom_tb;

    // Inputs
    reg [7:0] char_in;

    // Outputs
    wire [6:0] seg_out;

    // Instantiate the Unit Under Test (UUT)
    siekoo_rom uut (
        .char(char_in),
        .seg(seg_out)
    );

    initial begin
        // Initialize input and display the outputs for different characters
        
        // Test for numbers
        char_in = 8'h30; #50; // '0'
        $display("Input: '0' (0x30) -> Segments: %b", seg_out);
        
        char_in = 8'h31; #10; // '1'
        $display("Input: '1' (0x31) -> Segments: %b", seg_out);

        char_in = 8'h32; #10; // '2'
        $display("Input: '2' (0x32) -> Segments: %b", seg_out);

        char_in = 8'h33; #10; // '3'
        $display("Input: '3' (0x33) -> Segments: %b", seg_out);

        // Test for letters
        char_in = 8'h41; #10; // 'A'
        $display("Input: 'A' (0x41) -> Segments: %b", seg_out);
        
        char_in = 8'h42; #10; // 'B'
        $display("Input: 'B' (0x42) -> Segments: %b", seg_out);
        
        char_in = 8'h43; #10; // 'C'
        $display("Input: 'C' (0x43) -> Segments: %b", seg_out);

        // Test for special symbols
        char_in = 8'h2E; #10; // '.'
        $display("Input: '.' (0x2E) -> Segments: %b", seg_out);
        
        char_in = 8'h2D; #10; // '-'
        $display("Input: '-' (0x2D) -> Segments: %b", seg_out);

        char_in = 8'h3D; #10; // '='
        $display("Input: '=' (0x3D) -> Segments: %b", seg_out);

        // Test for unknown character (should be blank)
        char_in = 8'h7F; #10; // Unused character
        $display("Input: 'unknown' (0x7F) -> Segments: %b", seg_out);

        // Stop the simulation
        $stop;
    end

endmodule
