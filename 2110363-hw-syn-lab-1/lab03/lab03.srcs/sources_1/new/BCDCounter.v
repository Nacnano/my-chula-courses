`timescale 1ns / 1ps
//////////////////////////////////////////////////////////////////////////////////
// Company: 
// Engineer: 
// 
// Create Date: 09/10/2024 10:11:59 AM
// Design Name: 
// Module Name: BCDCounter
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


module BCDCounter(
        output reg[3:0] outputs,
        output reg cout,
        output reg bout, 
        input set9, 
        input set0, 
        input inc, 
        input dec, 
        input clk
    );
    
    initial outputs = 4'b0000;
    
    always @(posedge clk) begin
        bout = 0;
        cout = 0;
        case({inc, dec, set9, set0})
            4'b1000: begin cout = (outputs==9); outputs = (outputs+1)%10; end
            4'b0100: begin bout = (outputs==0); outputs = (outputs+9)%10; end
            4'b0010: outputs = 9;
            4'b0001: outputs = 0;
        endcase 
    end
    
endmodule
