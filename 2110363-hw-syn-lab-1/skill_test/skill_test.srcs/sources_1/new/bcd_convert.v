`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 10/08/2024 01:03:58 PM
// Design Name: 
// Module Name: bcd_convert
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


module bcd_convert(
    output reg [3:0] thousands,
    output reg [3:0] hundreds,
    output reg [3:0] tens,
    output reg [3:0] ones,
    input [14:0] binary_value
    );
    
    integer i;
    reg [27:0] shift_reg;
    
    always @(*) begin
        // Initialize shift register with binary value
        shift_reg = {14'b0, binary_value};
        
        // Perform double-dabble algorithm to convert binary to BCD
        for (i = 0; i < 14; i = i + 1) begin
            if (shift_reg[27:24] >= 5)
                shift_reg[27:24] = shift_reg[27:24] + 3;
            if (shift_reg[23:20] >= 5)
                shift_reg[23:20] = shift_reg[23:20] + 3;
            if (shift_reg[19:16] >= 5)
                shift_reg[19:16] = shift_reg[19:16] + 3;
            if (shift_reg[15:12] >= 5)
                shift_reg[15:12] = shift_reg[15:12] + 3;
            
            shift_reg = shift_reg << 1;
        end
        
        
        
        // Assign BCD digits
//        if(binary_value > 9999) begin
//            thousands = 10;
//            hundreds = 10;
//            tens = 10;
//            ones = 10;
        
//        end else begin
//            thousands = shift_reg[27:24];
//            hundreds = shift_reg[23:20];
//            tens = shift_reg[19:16];
//            ones = shift_reg[15:12];
//        end
        
         if(binary_value > 9999) begin
            thousands = 10;
            hundreds = 10;
            tens = 10;
            ones = 10;
        end else begin
            thousands = binary_value / 1000;
            hundreds = (binary_value % 1000) / 100;
            tens = (binary_value % 100) / 10;
            ones = binary_value % 10;
        end 
    end
    
endmodule
