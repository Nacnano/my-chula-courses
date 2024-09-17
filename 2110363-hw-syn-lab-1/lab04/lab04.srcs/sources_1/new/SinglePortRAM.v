`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/16/2024 10:20:48 PM
// Design Name: 
// Module Name: SinglePortRAM
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


// note: this is not SINGLE port.
module SinglePortRAM (
    output reg [7:0] addr , // Address
    output reg [7:0] dout, // Out
    input wire [7:0] din, // In
    input wire oe , // Output Enable
    input wire clk , we, reset
    ) ;
    
    reg [7:0] mem [255:0];
    
    initial begin
        dout = 0;
        addr = 0;
    end
    
    always @(posedge clk) begin
        if(we) begin // write enable = write d_input into RAM
            mem[addr] = din;
            addr = addr+1;
        end
        if(reset || (oe&&addr==0)) begin // reset button or empty stack
            dout = 0;
            addr = 0;
        end
        if(oe && addr > 0) begin // read from stack to d_output
            addr = addr-1;
            dout = mem[addr];
            mem[addr] = 0;
        end
    end
endmodule